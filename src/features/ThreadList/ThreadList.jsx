// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import SubredditInfo from "../../components/SubredditInfo";
import { Box } from "@mui/material";

// Function imports
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteThreads } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";

// Generate skeletons
const skeletons = (view) =>
  view === "searchResults" ? (
    <>
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
      <SkeletonSearchCard />
    </>
  ) : (
    <>
      <SkeletonThreadCard />
      <SkeletonThreadCard />
    </>
  );

const ThreadList = ({ view }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort") || useParams().sort;
  const { subredditName } = useParams();

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["threads", sort, query, subredditName],
    queryFn: ({ pageParam }) =>
      getInfiniteThreads({ after: pageParam, query, subredditName, sort }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.after;
    },
  });


  function onBottom() {
    fetchNextPage();
  }

  if (isLoading) {
    return skeletons(view);
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
    <Box className="ThreadList" mt={9}>
      <BottomScrollListener onBottom={onBottom} offset={1000} debounce={2000} />
      {view === "subreddit" && <SubredditInfo />}
      {threads}
      {hasNextPage ? skeletons(view) : "Nothing more to show."}
    </Box>
  );
};

export default ThreadList;
