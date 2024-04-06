import { useParams } from "react-router-dom";
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { Box, Button, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getThread } from "../../api";

const Thread = () => {
  const { redditId, subredditName } = useParams();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["thread", redditId],
    queryFn: () => getThread(subredditName, redditId),
  });

  document.title = `rLite | ${data?.thread.title || ""}`;

  const threadCard = data?.thread ? (
    <ThreadCard key={redditId} data={data.thread} cardType="thread" />
  ) : (
    <SkeletonThreadCard animation="wave" />
  );

  let commentCards;

  if (data?.comments?.length) {
    commentCards = data.comments.map((comment) => {
      if (comment.kind === "more") {
        return (
          <Button
            disabled
            variant="contained"
            key={comment.data.id}
            id={comment.data.id}
            sx={{ width: "fit-content", mb: 1 }}
          >
            Read more comments
          </Button>
        );
      }

      return (
        <CommentCard
          data={comment.data}
          threadAuthor={data.thread.author}
          indexTree={[comment.data.index]}
          key={comment.data.id}
          type={"top-level-comment"}
        />
      );
    });
  } else {
    commentCards = (
      <Card sx={{ display: "flex", alignItems: "center", p: 4 }}>
        <Typography>No comments yet!</Typography>
      </Card>
    );
  }

  return (
    <Box
      className="Thread"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isSuccess ? (
        <>
          {threadCard}
          {commentCards}
        </>
      ) : (
        <>
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
        </>
      )}
    </Box>
  );
};

export default Thread;
