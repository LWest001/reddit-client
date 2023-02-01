import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchThreads,
  selectAfter,
  selectThreadsStatus,
} from "../features/ThreadList/threadListSlice";
import { setThreadData, setComments } from "../features/Thread/threadSlice";

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
    dispatch(setThreadData({}));
    dispatch(setComments([]));
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
}

export default useFetchThreads;
