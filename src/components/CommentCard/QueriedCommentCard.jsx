import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { useParams } from "react-router-dom";
import ReadMoreButton from "./ReadMoreButton";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

import CommentHeaderText from "./CommentHeaderText";
import CommentAvatar from "./CommentAvatar";

import { useEffect, useMemo, useState } from "react";
import ExpandCollapseButton from "./ExpandCollapseButton";
import useGetReply from "../../functions/useGetReplies";
import CommentCard from "./CommentCard";
import SkeletonCommentCard from "./SkeletonCommentCard";

function QueriedCommentCard({ id, indexTree, threadAuthor, type }) {
  const { redditId, subredditName, threadTitle } = useParams();
  const { data, isLoading, isError } = useGetReply(
    id,
    subredditName,
    redditId,
    threadTitle
  );

  const [expanded, setExpanded] = useState(true);
  const [replies, setReplies] = useState([]);

  const isOp = useMemo(() => threadAuthor === data?.author);
  const timestamp = getTimeStamp(data?.created_utc);

  function handleCollapse() {
    const commentBody = document.getElementById(`comment-${data.id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
      setExpanded(false);
    } else {
      commentBody.style.display = "block";
      setExpanded(true);
    }
  }

  const bodyTextHTML = parseMarkdownText(data?.body_html);
  let subcomments;

  function handleReadMore(reply, e) {
    e.target.disabled = true;
    e.target.style.textDecoration = "none";
    e.target.style.cursor = "wait";
    setReplies((prev) => [
      ...prev,
      ...reply.data.children.map((id) => (
        <QueriedCommentCard
          key={id}
          id={id}
          threadAuthor={threadAuthor}
          type={"reply"}
        />
      )),
    ]);
    e.target.remove();
  }

  useEffect(
    () =>
      setReplies(
        data?.replies?.data?.children.map((reply, subIndex) => {
          if (!reply) return;
          if (reply.data?.count === 0) return;
          if (reply.kind === "more") {
            return (
              <ReadMoreButton
                key={`btn_${reply.data.id}`}
                data={reply.data}
                onClick={(e) => handleReadMore(reply, e)}
                id={`readMore-${reply.data.id}`}
              >
                {reply.data.children.length} more replies
              </ReadMoreButton>
            );
          }
          return (
            <CommentCard
              data={reply.data}
              indexTree={[...indexTree, subIndex]}
              key={reply.data?.id}
              threadAuthor={threadAuthor}
              type="subcomment"
            />
          );
        })
      ),
    []
  );

  if (isLoading) {
    return <SkeletonCommentCard animation="wave" />;
  }

  if (isError) {
    return;
  }

  return (
    data && (
      <Card
        raised={true}
        className={`CommentCard ${type}`}
        id={`cc-${data.id}`}
      >
        <CardHeader
          className="commentHeader"
          variant="commentCard"
          avatar={
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                py: 0,
              }}
            >
              <ExpandCollapseButton
                expanded={expanded}
                handleCollapse={handleCollapse}
              />
              <CommentAvatar isOp={isOp} author={data.author} id={data.id} />
            </Box>
          }
          title={
            <CommentHeaderText
              timestamp={timestamp}
              score={data.score}
              handleCollapse={handleCollapse}
              id={data.id}
            />
          }
        />
        <CardContent
          className="commentBody"
          id={`comment-${data.id}`}
          sx={{ paddingRight: 0, paddingTop: "0.2rem" }}
        >
          {bodyTextHTML}

          {replies}
        </CardContent>
      </Card>
    )
  );
}

export default QueriedCommentCard;
