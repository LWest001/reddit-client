import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchThreadsList,
  selectAfter,
  selectThreadsStatus,
} from "../features/ThreadList/threadListSlice";

function useFetchThreads(view) {
  const dispatch = useDispatch();
  let { sortType, subredditName } = useParams();
  const threadsStatus = useSelector(selectThreadsStatus);
  const after = useSelector(selectAfter);
  const [searchParams] = useSearchParams();
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
      dispatch(fetchThreadsList(options));
    }
  }, [threadsStatus, sortType, dispatch]);
}

export default useFetchThreads;
