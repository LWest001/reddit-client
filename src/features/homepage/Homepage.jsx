import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "./homepageSlice";
import { useEffect } from "react";
import {
  selectSortType,
  selectThreadsStatus,
  selectAllThreads,
} from "./homepageSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threads = useSelector(selectAllThreads);
  const sortType = useSelector(selectSortType);

  useEffect(() => {
    if (threadsStatus === "idle") {
      dispatch(fetchThreads(sortType));
    }
  }, [threadsStatus, sortType, dispatch]);
  return <>{threads}</>;
};

export default Homepage;
