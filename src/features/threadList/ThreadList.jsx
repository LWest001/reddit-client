// Library imports
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";

// Slice imports
import {
  fetchThreads,
  selectThreadsStatus,
  selectAllThreads,
  selectAfter,
  selectView,
  setView,
} from "../homepage/homepageSlice";

// Component imports
import ThreadCard from "../threadCard/ThreadCard";
import SearchCard from "../search/SearchCard/SearchCard";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
import SubredditInfo from "../../components/SubredditInfo";

// Function imports
import parseMarkdownText from "../../functions/parseMarkdownText";
import useFetchThreads from "../../functions/useFetchThreads";

const ThreadList = ({ view }) => {
  //   Hooks
  const dispatch = useDispatch();
  const { sortType, subredditName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");

  //   Selectors
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const after = useSelector(selectAfter);

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
      {searchResults && searchResults}
      {threads && threads}
    </>
  );
};

export default ThreadList;
