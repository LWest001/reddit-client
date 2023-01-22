import { useDispatch, useSelector } from "react-redux";
import {
  selectThreadsStatus,
  fetchSearchResults,
  selectAllThreads,
} from "./searchResultsSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchCard from "./SearchCard/SearchCard";
import { selectSortType } from "../../components/sortSelectorSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const sortType = useSelector(selectSortType);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const threads = threadsData.map((thread) => {
    return (
      <SearchCard
        key={thread.keyId}
        id={thread.keyId}
        subredditName={thread.subredditName}
        author={thread.author}
        timestamp={thread.timestamp}
        threadTitle={thread.threadTitle}
        score={thread.score}
        commentCount={thread.commentCount}
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
