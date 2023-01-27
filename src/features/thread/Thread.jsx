import "./Thread.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchData,
  selectThreadData,
  selectThreadStatus,
  selectAllComments,
} from "./threadSlice";
import ThreadCard from "../threadCard/ThreadCard";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
const Thread = () => {
  const dispatch = useDispatch();
  const threadStatus = useSelector(selectThreadStatus);
  const data = useSelector(selectThreadData);
  const comments = useSelector(selectAllComments);
  const { redditId, subredditName, threadTitle } = useParams();

  const thread = (
    <ThreadCard
      key={data.keyId}
      id={data.keyId}
      author={data.author}
      cardType="thread"
      commentCount={data.commentCount}
      gallery={data.gallery}
      icon={data.icon}
      image={data.image}
      link={data.link}
      score={data.score}
      selfText={data.selfText}
      richVideo={data.richVideo}
      subredditName={data.subredditName}
      threadTitle={data.threadTitle}
      threadType={data.threadType}
      thumbnail={data.thumbnail}
      timestamp={data.timestamp}
      video={data.video}
    />
  );
  useEffect(() => {
    if (threadStatus === "idle") {
      dispatch(
        fetchData(
          `https://www.reddit.com/r/${subredditName}/comments/${redditId}/${threadTitle}`
        )
      );
    }
  }, [threadStatus, dispatch]);

  return (
    <div className="Thread">
      {threadStatus === "loading" && (
        <>
          <SkeletonThreadCard />
        </>
      )}
      {threadStatus === "succeeded" && (
        <>
          {thread}
          {JSON.stringify(comments)}
        </>
      )}
    </div>
  );
};

export default Thread;
