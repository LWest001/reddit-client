import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import SearchCard from "./SearchCard/SearchCard";
import {
  fetchThreads,
  selectAllThreads,
  selectThreadsStatus,
  selectAfter,
} from "../homepage/homepageSlice";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
import useFetchThreads from "../../functions/useFetchThreads";

const SearchResults = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const after = useSelector(selectAfter);
  const { sortType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");

  const searchResults = threadsData.map((thread) => {
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

  useFetchThreads("searchResults");
  // useEffect(() => {
  //   if (threadsStatus === "idle") {
  //     dispatch(fetchThreads({ query: query, sortType: sort || "hot" }));
  //   } else if (threadsStatus === "loadMore") {
  //     dispatch(
  //       fetchThreads({ query: query, sortType: sort || "hot", after: after })
  //     );
  //   }
  // }, [threadsStatus, sortType, dispatch]);

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
