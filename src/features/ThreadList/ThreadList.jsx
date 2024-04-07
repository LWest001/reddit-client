// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import SubredditInfo from "../../components/SubredditInfo";
import { Box } from "@mui/material";

// Function imports
import { useQueries, useQuery } from "@tanstack/react-query";
import { getThreads } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import ErrorPage from "../ErrorPage";
import { useEffect, useState } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";

// Generate skeletons
const skeletons = (view) => {
  if (view === "searchResults") {
    return (
      <Box>
        <SkeletonSearchCard />
        <SkeletonSearchCard />
        <SkeletonSearchCard />
        <SkeletonSearchCard />
        <SkeletonSearchCard />
      </Box>
    );
  }
  return (
    <Box>
      <SkeletonThreadCard />
      <SkeletonThreadCard />
    </Box>
  );
};

const ThreadList = ({ view }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { subredditName, sort } = useParams();
  const [after, setAfter] = useState([]);
  const [threadsus, setThreads] = useState([]);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["threads", sort, subredditName],
    queryFn: () => getThreads({ subredditName, sort, query }),
  });

  const queries = useQueries({
    queries: after.map((id) => {
      return {
        queryKey: ["threads", sort, subredditName, after, id],
        queryFn: () => getThreads({ subredditName, sort, query, after: id }),
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setThreads(data.threads);
      setAfter([data.after]);
    }
  }, [data]);

  useEffect(() => {
    if (!queries.pending && queries.data.length) {
      setThreads((prev) => [...prev, ...queries.data.at(-1).threads].flat());
    }
  }, [queries]);

  console.log(threadsus, queries, after);

  function onBottom() {
    const nextAfter = queries.data.at(-1).after;
    if (!after.includes(nextAfter)) {
      setAfter((prev) => [...prev.filter((id) => id !== nextAfter), nextAfter]);
    }
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
  let searchResults = [];
  let threads = [];
  if (view !== "searchResults") {
    threads = threadsus.map((thread) => {
      return (
        <ThreadCard key={thread.data.id} data={thread.data} cardType={view} />
      );
    });
  }

  if (view === "searchResults") {
    return data.threads.map((thread) => {
      return (
        <SearchCard
          key={thread.data.id}
          data={thread.data}
          id={thread.data.id}
          author={thread.data.author}
          commentCount={thread.data.num_comments}
          icon={thread.data.icon}
          link={thread.data.permalink}
          score={thread.data.score}
          subredditName={thread.data.subreddit}
          threadTitle={thread.data.title}
          threadType={getThreadType(thread.data)}
          thumbnail={thread.data.thumbnail}
          timestamp={getTimeStamp(thread.data.created_utc)}
        />
      );
    });
  }

  return (
    <Box className="ThreadList" mt={9}>
      <BottomScrollListener onBottom={onBottom} offset={5000} />
      {view === "subreddit" && <SubredditInfo />}
      {isLoading && skeletons()}
      {(isSuccess || isLoading) &&
        searchResults &&
        view === "searchResults" &&
        searchResults}
      {(isSuccess || isLoading) &&
        threads &&
        view !== "searchResults" &&
        threads}
    </Box>
  );
};

export default ThreadList;
