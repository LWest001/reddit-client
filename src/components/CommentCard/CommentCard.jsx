import ReadMoreButton from "./ReadMoreButton";
import { useState } from "react";
import QueriedCommentCard from "./QueriedCommentCard";
import CommentCardTemplate from "./CommentCardTemplate";

function CommentCard({ data, threadAuthor }) {
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
        data={data}
        replies={replies}
        threadAuthor={threadAuthor}
      />
    )
  );
}

export default CommentCard;
