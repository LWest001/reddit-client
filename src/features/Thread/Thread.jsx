import { useParams } from "react-router-dom";
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import { Box, Button, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getInfiniteComment, getThread } from "../../api";
import { useMemo, useState } from "react";
import { useMargin } from "../../functions/useMargin";
import ErrorPage from "../ErrorPage";
import { BottomScrollListener } from "react-bottom-scroll-listener";

const Thread = () => {
  const { redditId, subredditName, sort, threadTitle } = useParams();
  const [moreComments, setMoreComments] = useState([]);
  const [moreIndices, setMoreIndices] = useState([0, 20]);

  function onBottom() {
    if (isFetchingMore) return;
    setMoreComments((prev) => [...prev, ...moreData]);
    setMoreIndices((prev) => [
      prev[0] + 20,
      moreIndices[1] > moreCommentsCount ? moreCommentsCount - 1 : prev[1] + 20,
    ]);
  }

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["thread", sort, redditId],
    queryFn: () => getThread(subredditName, redditId, sort),
  });

  const moreCommentIds =
    data?.comments
      .at(-1)
      ?.data?.children?.slice(moreIndices[0], moreIndices[1]) || [];

  const moreCommentsCount = data?.comments.at(-1)?.data?.count || 0;

  const {
    data: moreData,
    isLoading: isLoadingMore,
    isFetching: isFetchingMore,
  } = useQuery({
    queryKey: ["comments", redditId, moreCommentIds],
    queryFn: () =>
      getInfiniteComment({
        subreddit: subredditName,
        threadId: redditId,
        threadTitle,
        ids: moreCommentIds,
      }),
  });

  document.title = `rLite | ${data?.thread.title || ""}`;

  const commentCards = useMemo(
    () =>
      data?.comments?.length ? (
        data.comments.map((comment) => {
          if (comment.kind === "more") {
            return;
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

  const moreCommentCards = useMemo(
    () =>
      moreComments.length
        ? moreComments.map((comment) => {
            if (comment.status === "rejected") return;
            return (
              <CommentCard
                data={comment.value}
                threadAuthor={data.thread.author}
                key={comment.value.id}
                type={"top-level-comment"}
              />
            );
          })
        : [],
    [moreComments]
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
  ) : isError ? (
    <ErrorPage />
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
      <BottomScrollListener onBottom={onBottom} debounce={2000} offset={500}>
        {isSuccess && (
          <>
            <ThreadCard key={redditId} data={data.thread} cardType="thread" />
            {commentCards}
            {moreCommentCards}
            {isFetchingMore && (
              <>
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
              </>
            )}
          </>
        )}
      </BottomScrollListener>
    </Box>
  );
};

export default Thread;
