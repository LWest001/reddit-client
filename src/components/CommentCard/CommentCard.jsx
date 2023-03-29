import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { fetchThread } from "../../features/Thread/threadSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReadMoreButton from "./ReadMoreButton";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

import CommentHeaderText from "./CommentHeaderText";
import CommentAvatar from "./CommentAvatar";

import { useMemo, useState } from "react";
import ExpandCollapseButton from "./ExpandCollapseButton";

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
  const [expanded, setExpanded] = useState(true);

  const isOp = useMemo(() => threadAuthor === author);

  function handleCollapse() {
    const commentBody = document.getElementById(`comment-${id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
      setExpanded(false);
    } else {
      commentBody.style.display = "block";
      setExpanded(true);
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
          <Box
            sx={{ display: "flex", width: "100%", alignItems: "center", py: 0 }}
          >
            <ExpandCollapseButton expanded={expanded} handleCollapse={handleCollapse}/>
            <CommentAvatar isOp={isOp} author={author} id={id} />
          </Box>
        }
        title={
          <CommentHeaderText
            timestamp={timestamp}
            score={score}
            handleCollapse={handleCollapse}
            id={id}
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
