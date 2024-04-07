// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import SubredditInfo from "../../components/SubredditInfo";
import { Box } from "@mui/material";

// Function imports
import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";

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
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["threads", sort, subredditName],
    queryFn: () => getThreads({ subredditName, sort, query }),
  });

  if (isLoading) {
    return skeletons(view);
  }

  // Set title
  if (view === "homepage") {
    document.title = "rLite | Home ";
  } else if (view === "searchResults") {
    document.title = `rLite | Search results: ${query}`;
  }

  // Generate list
  let searchResults;
  let threads;
  if (view !== "searchResults") {
    threads = data.threads.map((thread) => {
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
