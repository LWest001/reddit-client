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
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import selectImagePreview from "../../functions/selectImagePreview";

const Thread = () => {
  const dispatch = useDispatch();
  const threadStatus = useSelector(selectThreadStatus);
  const threadData = useSelector(selectThreadData);
  const commentsData = useSelector(selectAllComments);
  const {
    redditId,
    subredditName,
    threadTitle,
    sortType = "hot",
  } = useParams();

  const thread = (
    <ThreadCard
      key={threadData.keyId}
      id={threadData.keyId}
      author={threadData.author}
      cardType="thread"
      commentCount={threadData.commentCount}
      gallery={threadData.gallery}
      icon={threadData.icon}
      image={
        ["image", "video"].includes(threadData.threadType) && {
          fullSizeImage: threadData.image,
          previewSizeImage: selectImagePreview(threadData.imagePreview).preview,
          placeholderImage: selectImagePreview(threadData.imagePreview)
            .placeholder,
        }
      }
      link={threadData.link}
      score={threadData.score}
      selfText={threadData.selfText}
      richVideo={threadData.richVideo}
      subredditName={threadData.subredditName}
      threadTitle={threadData.threadTitle}
      threadType={threadData.threadType}
      thumbnail={threadData.thumbnail}
      timestamp={threadData.timestamp}
      video={threadData.video}
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
        author={comment.author}
        body={comment.body}
        id={comment.keyId}
        key={comment.keyId}
        replies={comment.replies}
        score={comment.score}
        timestamp={comment.timestamp}
        type={"top-level-comment"}
      />
    );
  });

  useEffect(() => {
    if (threadStatus === "idle") {
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
      {Object.entries(threadData).length && thread}
      {threadStatus === "loading" && (
        <>
          {!Object.entries(threadData).length && <SkeletonThreadCard />}
          {threadData && (
            <>
              <SkeletonCommentCard />
              <SkeletonCommentCard />
              <SkeletonCommentCard />
              <SkeletonCommentCard />
              <SkeletonCommentCard />
              <SkeletonCommentCard />
            </>
          )}
        </>
      )}
      {threadStatus === "succeeded" && <>{comments}</>}
    </div>
  );
};

export default Thread;
