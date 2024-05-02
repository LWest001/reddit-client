// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import {
  Alert,
  Box,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

// Function imports
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteThreads } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useMargin } from "../../functions/useMargin";

// Generate skeletons
const Skeletons = ({ view }) => {
  const subreddit = view === "subreddit";
  const marginTop = useMargin(0.5);
  return view === "searchResults" ? (
    <Box mt={!subreddit ? marginTop : "initial"}>
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
    </Box>
  ) : (
    <Box mt={!subreddit ? marginTop : "initial"}>
      <SkeletonThreadCard subreddit={subreddit} />
      <SkeletonThreadCard subreddit={subreddit} />
    </Box>
  );
};

const ThreadList = ({ view }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const time = searchParams.get("t");
  const sort = searchParams.get("sort") || useParams().sort;
  const { subredditName } = useParams();
  const marginTop = useMargin(0.5);

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["threads", sort, query, time, subredditName],
    queryFn: ({ pageParam }) =>
      getInfiniteThreads({
        after: pageParam,
        query,
        subredditName,
        sort,
        time,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.after;
    },
  });

  function onBottom() {
    fetchNextPage();
  }

  if (isLoading) {
    return <Skeletons view={view} />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Set title
  if (view === "homepage") {
    document.title = "rLite | Home ";
  } else if (view === "searchResults") {
    document.title = `rLite | Search results: ${query}`;
  }

  // Generate list
  const threads = data.pages.map((group, i) => (
    <React.Fragment key={i}>
      {group.threads.map((thread) =>
        view !== "searchResults" ? (
          <ThreadCard key={thread.data.id} data={thread.data} cardType={view} />
        ) : (
          <SearchCard key={thread.data.id} data={thread.data} />
        )
      )}
    </React.Fragment>
  ));

  return (
    <Stack
      className="ThreadList"
      mt={view !== "subreddit" ? marginTop : "initial"}
    >
      <BottomScrollListener onBottom={onBottom} offset={1000} debounce={2000} />
      {threads}
      {hasNextPage && isFetchingNextPage ? (
        <Skeletons view={view} />
      ) : (
        "Nothing more to show."
      )}
      <Snackbar
        open={isLoading || (hasNextPage && isFetchingNextPage)}
        autoHideDuration={6000}
        message="Loading more threads"
      >
        <Alert severity="info" sx={{ alignItems: "center" }}>
          <Typography display="inline">Loading more threads</Typography>
          <LinearProgress size={"1rem"} />
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ThreadList;
