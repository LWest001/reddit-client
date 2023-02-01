import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchCard from "./SearchCard/SearchCard";
import { selectSortType } from "../../components/sortSelector/sortSelectorSlice";
import {
  fetchThreads,
  selectAllThreads,
  selectThreadsStatus,
  selectAfter,
} from "../homepage/homepageSlice";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";

const SearchResults = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const sortType = useSelector(selectSortType);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");
  const after = useSelector(selectAfter);

  const searchResults = threadsData.map((thread) => {
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
        dispatch(
          fetchThreads({ query: query, sortType: sort || "hot" })
        );
      } else if (threadsStatus === "loadMore") {
        dispatch(
          fetchThreads({ query: query, sortType: sort || "hot", after: after })
        );
      }
    }, [threadsStatus, sortType, dispatch]);

  return (
    <>
      {threadsStatus === "loading" && (
        <>
          <SkeletonThreadCard />
          <SkeletonThreadCard />
        </>
      )}
      {searchResults && searchResults}
    </>
  );
};

export default SearchResults;
