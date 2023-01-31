import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchThreads,
  selectThreadsStatus,
  selectAllThreads,
} from "./homepageSlice";
import ThreadCard from "../threadCard/ThreadCard";
import { useParams } from "react-router-dom";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";

const Homepage = () => {
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const { sortType } = useParams();

  const threads = threadsData.map((thread) => {
    return (
      <ThreadCard
        key={thread.keyId}
        id={thread.keyId}
        author={thread.author}
        cardType="homepage"
        commentCount={thread.commentCount}
        gallery={thread.gallery}
        icon={thread.icon}
        image={thread.image}
        link={thread.link}
        redditId={thread.redditId}
        score={thread.score}
        selfText={thread.selfText}
        richVideo={thread.richVideo}
        subredditName={thread.subredditName}
        threadTitle={thread.threadTitle}
        threadType={thread.threadType}
        thumbnail={thread.thumbnail}
        timestamp={thread.timestamp}
        video={thread.video}
      />
    );
  });

  useEffect(() => {
    if (threadsStatus === "idle") {
      dispatch(
        fetchThreads({
          sortType: sortType ? sortType : "hot",
        })
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
      {threadsStatus === "succeeded" && threads}
    </>
  );
};

export default Homepage;
