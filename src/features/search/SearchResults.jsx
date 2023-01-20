import { useDispatch, useSelector } from "react-redux";
import {
  selectThreadsStatus,
  fetchSearchResults,
  selectAllThreads,
  selectSortType,
} from "./searchResultsSlice";
import { useEffect } from "react";
import ThreadCard from "../threadCard/ThreadCard";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const sortType = useSelector(selectSortType);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const threads = threadsData.map((thread) => {
    return (
      <ThreadCard
        key={thread.keyId}
        id={thread.keyId}
        subredditName={thread.subredditName}
        author={thread.author}
        timestamp={thread.timestamp}
        threadTitle={thread.threadTitle}
        score={thread.score}
        gallery={thread.threadType === "gallery" && thread.gallery}
        icon={thread.icon}
        image={thread.threadType === "image" && thread.image}
        link={thread.link}
        thumbnail={thread.thumbnail}
        richVideo={thread.threadType === "richVideo" && thread.richVideo}
        selfText={thread.threadType === "self" && thread.selfText}
        threadType={thread.threadType}
        video={thread.threadType === "video" && thread.video}
      />
    );
  });
  useEffect(() => {
    if (threadsStatus === "idle") {
      dispatch(fetchSearchResults(query));
    }
  }, [threadsStatus, sortType, dispatch]);
  return (
    <>
      {threadsStatus === "loading" && "Loading..."}
      {threadsStatus === "succeeded" && threads}
    </>
  );
};

export default SearchResults;
