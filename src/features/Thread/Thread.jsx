import { useParams } from "react-router-dom";
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import { Box, Button, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getThread } from "../../api";
import { useMemo } from "react";
import { useMargin } from "../../functions/useMargin";

const Thread = () => {
  const { redditId, subredditName, sort } = useParams();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["thread", redditId],
    queryFn: () => getThread(subredditName, redditId, sort),
  });

  document.title = `rLite | ${data?.thread.title || ""}`;

  const commentCards = useMemo(
    () =>
      data?.comments?.length ? (
        data.comments.map((comment) => {
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
        })
      ) : (
        <Card sx={{ display: "flex", alignItems: "center", p: 4 }}>
          <Typography>No comments yet!</Typography>
        </Card>
      ),
    [data]
  );

  return isLoading ? (
    <Box mt={useMargin()}>
      <SkeletonThreadCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
    </Box>
  ) : (
    <Box
      className="Thread"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      mt={useMargin()}
    >
      {isSuccess && (
        <>
          <ThreadCard key={redditId} data={data.thread} cardType="thread" />
          {commentCards}
        </>
      )}
    </Box>
  );
};

export default Thread;
