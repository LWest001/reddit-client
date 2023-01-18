import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "./homepageSlice";
import { useEffect } from "react";
import {
  selectSortType,
  selectThreadsStatus,
  selectAllThreads,
} from "./homepageSlice";
import ThreadCard from "../threadCard/ThreadCard";

const Homepage = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const sortType = useSelector(selectSortType);

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
      dispatch(fetchThreads(sortType));
    }
  }, [threadsStatus, sortType, dispatch]);
  return (
    <>
      {threadsStatus === "loading" && "Loading..."}
      {threadsStatus === "succeeded" && threads}
    </>
  );
};

export default Homepage;
