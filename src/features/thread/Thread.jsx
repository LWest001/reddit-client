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
import CommentCard from "../../components/commentCard/CommentCard";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
const Thread = () => {
  const dispatch = useDispatch();
  const threadStatus = useSelector(selectThreadStatus);
  const data = useSelector(selectThreadData);
  const commentsData = useSelector(selectAllComments);
  const { redditId, subredditName, threadTitle, sortType } = useParams();

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

  const comments = commentsData.map((comment) => {
    if (comment.type === "readMore") {
      return (
        <button key={comment.keyId} id={comment.keyId}>
          Read more comments
        </button>
      );
    }
    return (
      <CommentCard
        key={comment.keyId}
        id={comment.keyId}
        author={comment.author}
        score={comment.score}
        body={comment.body}
        richVideo={comment.richVideo}
        subredditName={comment.subredditName}
        threadTitle={comment.threadTitle}
        threadType={comment.threadType}
        thumbnail={comment.thumbnail}
        timestamp={comment.timestamp}
        video={comment.video}
      />
    );
  });

  useEffect(() => {
    if (threadStatus === "idle") {
      console.log(sortType);
      dispatch(
        fetchData({
          link: `https://www.reddit.com/r/${subredditName}/comments/${redditId}/${threadTitle}`,
          sortType: sortType,
        })
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
          {comments}
        </>
      )}
    </div>
  );
};

export default Thread;
