import parseMarkdownText from "../../functions/parseMarkdownText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import ReadMoreButton from "./ReadMoreButton";
import { useMemo, useState } from "react";
import QueriedCommentCard from "./QueriedCommentCard";
import CommentCardTemplate from "./CommentCardTemplate";

function CommentCard({ data, threadAuthor }) {
  const [expanded, setExpanded] = useState(true);
  const [replies, setReplies] = useState(
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

export default CommentCard;
