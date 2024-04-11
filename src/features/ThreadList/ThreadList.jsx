// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import { Box } from "@mui/material";

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
  const marginTop = useMargin();
  return view === "searchResults" ? (
    <Box mt={marginTop}>
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
    </Box>
  ) : (
    <Box mt={marginTop}>
      <SkeletonThreadCard />
      <SkeletonThreadCard />
    </Box>
  );
};

const ThreadList = ({ view }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const time = searchParams.get("t");
  const sort = searchParams.get("sort") || useParams().sort;
  const { subredditName } = useParams();
  const marginTop = useMargin();

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
    <Box className="ThreadList" mt={marginTop}>
      <BottomScrollListener onBottom={onBottom} offset={1000} debounce={2000} />
      {threads}
      {hasNextPage && isFetchingNextPage ? (
        <Skeletons view={view} />
      ) : (
        "Nothing more to show."
      )}
    </Box>
  );
};

export default ThreadList;
