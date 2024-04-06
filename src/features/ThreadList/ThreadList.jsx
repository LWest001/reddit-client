// Library imports
import { useSelector } from "react-redux";

// Slice imports
import { selectQuery } from "./threadListSlice";

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
  const query = useSelector(selectQuery);
  const { isLoading, isError, isSuccess, data, status } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });
 
  if (isLoading) {
    return skeletons(view);
  }

  //   Selectors
  // const threadsStatus = useSelector(selectThreadsStatus);
  // const threadsData = useSelector(selectAllThreads);
  // const subredditThreadsData = useSelector(selectSubredditThreads);
  // const searchThreadsData = useSelector(selectSearchThreads);

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
    const viewData = view === "subreddit" ? data.threads : data.threads;
    threads = viewData.map((thread) => {
      return (
        <ThreadCard key={thread.data.id} data={thread.data} cardType={view} />
      );
    });
  }
  if (view === "searchResults") {
    searchResults = data.map((thread) => {
      return (
        <SearchCard
          key={thread.id}
          id={thread.id}
          author={thread.author}
          commentCount={thread.commentCount}
          icon={thread.icon}
          link={thread.link}
          score={thread.score}
          subredditName={thread.subredditName}
          threadTitle={thread.threadTitle}
          threadType={thread.threadType}
          thumbnail={thread.thumbnail}
          timestamp={thread.timestamp}
        />
      );
    });
  }

  // useFetchThreads(view);

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
