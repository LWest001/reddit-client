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
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { fetchIcon, getInfiniteThreads } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import React, { createContext, useCallback, useMemo } from "react";
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

const SORT_TYPES = ["hot", "top", "controversial", "new", "rising"];
export const getSort = (sort) => {
  return SORT_TYPES.includes(sort) ? sort : undefined;
};

export const IconsContext = createContext({});

const ThreadList = ({ view }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchWithin = searchParams.get("restrict_sr");
  const time = searchParams.get("t");

  const { subreddit, sort: sortParam } = useParams();

  let sort = getSort(searchParams.get("sort") || sortParam || "hot");

  const marginTop = useMargin(0.5);

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["threads", sort, query, time, subreddit],
    queryFn: ({ pageParam }) =>
      getInfiniteThreads({
        after: pageParam,
        query,
        subreddit,
        sort,
        time,
        searchWithin: searchWithin === "on",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.after;
    },
    refetchOnWindowFocus: false,
    enabled: SORT_TYPES.includes(sort),
  });

  const subreddits = useMemo(
    () =>
      data
        ? data?.pages
            ?.map((page) =>
              page.threads?.map((thread) => thread.data.subreddit)
            )
            .flat()
        : [],
    [data]
  );

  const communityIcons = useQueries({
    queries: subreddits.map((sub, i) => {
      return {
        queryKey: ["icon", sub],
        queryFn: async ({ signal }) => fetchIcon(sub, signal, i * 1000),
      };
    }),
    combine: (results) => {
      const combinedData = {};
      for (const key of results) {
        const sub = key?.data?.subreddit;
        combinedData[sub] = key?.data?.icon;
      }
      return {
        data: combinedData,
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const onBottom = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Skeletons view={view} />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  // Set title
  if (view === "homepage") {
    document.title = "rLite | Home ";
  } else if (view === "searchResults") {
    document.title = `rLite | Search results: ${query}`;
  }

  // Generate list
  const threads = data?.pages.map((group, i) => (
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
      <IconsContext.Provider value={communityIcons}>
        {threads}
      </IconsContext.Provider>
      {hasNextPage && isFetchingNextPage ? (
        <Skeletons view={view} />
      ) : (
        "Nothing more to show."
      )}
      <Snackbar
        open={isLoading || (hasNextPage && isFetchingNextPage)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
