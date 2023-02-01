// Library imports
import { useSelector } from "react-redux";

// Slice imports
import { selectThreadsStatus, selectAllThreads } from "./threadListSlice";

// Component imports
import ThreadCard from "../threadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
import SubredditInfo from "../../components/SubredditInfo";

// Function imports
import useFetchThreads from "../../functions/useFetchThreads";

// Stylesheet imports
import "./Subreddit.css";

const ThreadList = ({ view }) => {
  //   Selectors
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);

  // Generate list
  let searchResults;
  let threads;
  if (view !== "searchResults") {
    threads = threadsData.map((thread) => {
      return (
        <ThreadCard
          key={thread.keyId}
          id={thread.keyId}
          author={thread.author}
          cardType={view}
          commentCount={thread.commentCount}
          gallery={thread.gallery}
          icon={thread.icon}
          image={thread.image}
          link={thread.link}
          postFlair={thread.postFlair}
          redditId={thread.redditId}
          richVideo={thread.richVideo}
          score={thread.score}
          selfText={thread.selfText}
          subredditName={thread.subredditName}
          threadTitle={thread.threadTitle}
          threadType={thread.threadType}
          thumbnail={thread.thumbnail}
          timestamp={thread.timestamp}
          video={thread.video}
        />
      );
    });
  }

  if (view === "searchResults") {
    searchResults = threadsData.map((thread) => {
      return (
        <SearchCard
          key={thread.keyId}
          id={thread.keyId}
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

  useFetchThreads(view);

  return (
    <>
      {view === "subreddit" && <SubredditInfo />}
      {threadsStatus === "loading" && (
        <>
          <SkeletonThreadCard />
          <SkeletonThreadCard />
        </>
      )}
      {searchResults && view === "searchResults" && searchResults}
      {threads && view !== "searchResults" && threads}
    </>
  );
};

export default ThreadList;
