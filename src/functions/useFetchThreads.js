import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchThreads,
  selectAfter,
  selectThreadsStatus,
} from "../features/homepage/homepageSlice";

function useFetchThreads(view) {
  const dispatch = useDispatch();
  let { sortType, subredditName } = useParams();
  const threadsStatus = useSelector(selectThreadsStatus);
  const after = useSelector(selectAfter);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  if (view === "searchResults") {
    sortType = searchParams.get("sort");
  }

  useEffect(() => {
    const options = {
      sortType: sortType ? sortType : "hot",
      subredditName: subredditName,
      query: query,
    };
    if (threadsStatus === "loadMore") {
      options.after = after;
    }

    if (["idle", "loadMore"].includes(threadsStatus)) {
      dispatch(fetchThreads(options));
    }
  }, [threadsStatus, sortType, dispatch]);
  return;
}

export default useFetchThreads;
