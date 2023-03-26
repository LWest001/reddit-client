import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { fetchThread } from "../../features/Thread/threadSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReadMoreButton from "../ReadMoreButton";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Box,
  Badge,
  styled,
} from "@mui/material";
import stringAvatar from "../../functions/stringAvatar";

import CommentHeaderText from "./CommentHeaderText";

import { isMobile } from "react-device-detect";
import { useMemo, useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0",
  },
}));

function CommentCard({
  author,
  body,
  id,
  indexTree,
  replies,
  score,
  threadAuthor,
  timestamp,
  type,
}) {
  const dispatch = useDispatch();
  const { subredditName, redditId, threadTitle } = useParams();

  const [clicked, setClicked] = useState(false);
  const isOp = useMemo(() => threadAuthor === author);

  function handleCollapse() {
    const commentBody = document.getElementById(`comment-${id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
    } else {
      commentBody.style.display = "block";
    }
  }

  const bodyTextHTML = parseMarkdownText(body);
  let subcomments;

  function handleReadMore(children, e) {
    e.target.remove();
    e.target.disabled = true;
    e.target.style.textDecoration = "none";
    e.target.style.cursor = "wait";
    children.forEach((child) => {
      dispatch(
        fetchThread({
          link: `https://www.reddit.com/r/${subredditName}/comments/${redditId}/${threadTitle}/${child}`,
          requestType: "subreplies",
          indexTree: indexTree,
        })
      );
    });
  }

  function generateSubcomments() {
    subcomments = replies?.data?.children?.map((subcomment, subIndex) => {
      const { data, kind } = subcomment;
      if (data.count === 0) return;
      if (kind === "more") {
        return (
          <ReadMoreButton
            key={`btn_${data.id}`}
            data={data}
            onClick={(e) => handleReadMore(data.children, e)}
            id={`readMore-${data.id}`}
          >
            {data.children.length} more replies
          </ReadMoreButton>
        );
      }

      return (
        <CommentCard
          author={data.author}
          body={data.body_html}
          id={data.id}
          indexTree={[...indexTree, subIndex]}
          key={data.id}
          replies={data.replies}
          score={data.ups}
          threadAuthor={threadAuthor}
          timestamp={getTimeStamp(data.created_utc)}
          type="subcomment"
        />
      );
    });
  }

  if (replies) {
    generateSubcomments();
  }

  return (
    <Card raised={true} className={`CommentCard ${type}`} id={`cc-${id}`}>
      <CardHeader
        className="commentHeader"
        variant="commentCard"
        avatar={
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <StyledBadge
              badgeContent={"👑"}
              invisible={!isOp}
              color="secondary"
            >
              <Avatar
                {...stringAvatar(author)}
                variant="rounded"
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.innerHTML = author;
                    e.target.style.width = "100%";
                    e.target.style.maxWidth = "fit-content";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile && !clicked) {
                    e.target.innerHTML = author.substring(0, 1).toUpperCase();
                    e.target.style.width = "1.4rem";
                  }
                }}
                onClick={(e) => {
                  const text = document.querySelector(
                    `#CommentHeaderText-${id}`
                  );
                  if (!clicked) {
                    setClicked(true);
                    e.target.innerHTML = author;
                    e.target.style.width = "100%";
                    e.target.style.maxWidth = "fit-content";
                    if (isMobile) {
                      text.style.display = "none";
                    }
                  } else {
                    setClicked(false);
                    e.target.innerHTML = author.substring(0, 1).toUpperCase();
                    e.target.style.width = "1.4rem";
                    if (isMobile) {
                      text.style.display = "flex";
                    }
                  }
                }}
              />
            </StyledBadge>
          </Box>
        }
        title={
          <CommentHeaderText
            timestamp={timestamp}
            score={score}
            handleCollapse={handleCollapse}
            id={id}
            isOp={isOp}
          />
        }
      />
      <CardContent
        className="commentBody"
        id={`comment-${id}`}
        sx={{ paddingRight: 0, paddingTop: "0.2rem" }}
      >
        {bodyTextHTML}

        {subcomments && subcomments}
      </CardContent>
    </Card>
  );
}

export default CommentCard;
