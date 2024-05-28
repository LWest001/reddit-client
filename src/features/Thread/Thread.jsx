import { useParams } from "react-router-dom";
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import {
  Alert,
  Box,
  Card,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getInfiniteComment, getThread } from "../../api";
import { useCallback, useMemo, useState } from "react";
import { useMargin } from "../../functions/useMargin";
import ErrorPage from "../ErrorPage";
import { BottomScrollListener } from "react-bottom-scroll-listener";

const MORE_INDICES_THRESHOLD = 10;

const Thread = () => {
  const { redditId, subreddit, sort, threadTitle } = useParams();
  const [moreComments, setMoreComments] = useState([]);
  const [moreIndices, setMoreIndices] = useState([0, MORE_INDICES_THRESHOLD]);
  const [enableScrolling, setEnableScrolling] = useState(false);

  const { data, isLoading, isFetching, isError, error, isSuccess } = useQuery({
    queryKey: ["thread", sort, redditId],
    queryFn: () => getThread(subreddit, redditId, sort),
    refetchOnWindowFocus: false,
  });

  document.title = `rLite | ${data?.thread.title || ""}`;

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
        subreddit: subreddit,
        threadId: redditId,
        threadTitle,
        ids: moreCommentIds,
      }),
    refetchOnWindowFocus: false,
    enabled: enableScrolling && window.scrollY > 0,
  });
  const onBottom = useCallback(() => {
    if (!enableScrolling) {
      setEnableScrolling(true);
    } else if (
      moreData &&
      !isLoading &&
      !isLoadingMore &&
      !isFetchingMore &&
      !isFetching
    ) {
      setMoreComments((prev) => [...prev, ...moreData]);
      setMoreIndices((prev) => [
        prev[0] + MORE_INDICES_THRESHOLD,
        moreIndices[1] > moreCommentsCount
          ? moreCommentsCount - 1
          : prev[1] + MORE_INDICES_THRESHOLD,
      ]);
    }
  }, [
    setMoreComments,
    setMoreIndices,
    moreIndices,
    moreCommentsCount,
    enableScrolling,
    setEnableScrolling,
    moreData,
    isLoading,
    isLoadingMore,
    isFetchingMore,
    isFetching,
  ]);

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
        : [<Box key="more"></Box>],
    [moreComments]
  );

  return isLoading ? (
    <Box mt={useMargin(0.5)}>
      <SkeletonThreadCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
      <SkeletonCommentCard animation="wave" />
    </Box>
  ) : isError ? (
    <ErrorPage error={error} />
  ) : (
    <Box
      className="Thread"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      mt={useMargin(0.5)}
    >
      {isSuccess && (
        <>
          <ThreadCard key={redditId} data={data.thread} cardType="thread" />
          {commentCards}
          <BottomScrollListener
            onBottom={onBottom}
            debounce={2000}
            offset={500}
          >
            {moreCommentCards}
          </BottomScrollListener>
          {isLoadingMore ||
            (isFetchingMore && (
              <>
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
                <SkeletonCommentCard animation="wave" />
              </>
            ))}
        </>
      )}
      <Snackbar open={isLoadingMore || isFetchingMore} autoHideDuration={6000}>
        <Alert severity="info" sx={{ alignItems: "center" }}>
          <Typography display="inline">Loading more comments</Typography>
          <LinearProgress size={"1rem"} />
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Thread;
