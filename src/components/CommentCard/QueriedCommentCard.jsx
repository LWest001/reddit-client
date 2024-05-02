import parseMarkdownText from "../../functions/parseMarkdownText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { useParams } from "react-router-dom";
import ReadMoreButton from "./ReadMoreButton";
import { Paper, Typography } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import useGetReply from "../../functions/useGetReplies";
import CommentCard from "./CommentCard";
import SkeletonCommentCard from "./SkeletonCommentCard";
import CommentCardTemplate from "./CommentCardTemplate";

function QueriedCommentCard({ id, threadAuthor }) {
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

  function handleReadMore(data) {
    setReplies((prev) => [
      ...prev,
      ...data.children.map((id) => (
        <QueriedCommentCard
          key={id}
          id={id}
          threadAuthor={threadAuthor}
          type={"reply"}
        />
      )),
    ]);
  }

  useEffect(() => {
    setReplies(
      data?.replies?.data?.children.map((reply) => {
        if (!reply) return;
        if (reply.data?.count === 0) return;
        if (reply.kind === "more") {
          return (
            <ReadMoreButton
              key={`btn_${reply.data.id}`}
              data={reply.data}
              onClick={handleReadMore}
              id={`readMore-${reply.data.id}`}
            />
          );
        }
        return (
          <CommentCard
            data={reply.data}
            key={reply.data?.id}
            threadAuthor={threadAuthor}
          />
        );
      })
    );
    return setReplies([]);
  }, []);

  if (isLoading) {
    return <SkeletonCommentCard animation="wave" />;
  }

  if (isError) {
    return (
      <Paper>
        <Typography color="grey" m={1}>
          [Deleted]
        </Typography>
      </Paper>
    );
  }

  return (
    data && (
      <CommentCardTemplate
        bodyTextHTML={bodyTextHTML}
        data={data}
        expanded={expanded}
        handleCollapse={handleCollapse}
        isOp={isOp}
        replies={replies}
        timestamp={timestamp}
      />
    )
  );
}

export default QueriedCommentCard;
