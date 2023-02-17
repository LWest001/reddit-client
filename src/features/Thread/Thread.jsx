import "./Thread.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchThread,
  selectThreadData,
  selectThreadStatus,
  selectAllComments,
  setThreadData,
} from "./threadSlice";
import ThreadCard from "../ThreadCard/ThreadCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonCommentCard from "../../components/CommentCard/SkeletonCommentCard";
import selectImagePreview from "../../functions/selectImagePreview";
import { getTimeStamp } from "../../functions/getTimeStamp";

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
      key={threadData.id}
      id={threadData.id}
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
      postFlair={threadData.postFlair}
      redditId={threadData.redditId}
      richVideo={threadData.richVideo}
      score={threadData.score}
      selfText={threadData.selfText}
      subredditName={threadData.subredditName}
      threadTitle={threadData.threadTitle}
      threadType={threadData.threadType}
      thumbnail={threadData.thumbnail}
      timestamp={threadData.timestamp}
      url={threadData.url}
      video={threadData.video}
    />
  );

  const comments = commentsData.map((comment) => {
    if (comment.kind === "more") {
      return (
        <button key={comment.data.id} id={comment.data.id}>
          Read more comments
        </button>
      );
    }
    const { data } = comment;
    return (
      <CommentCard
        author={data.author}
        body={data.body_html}
        id={data.id}
        indexTree={[data.index]}
        key={data.id}
        replies={data.replies}
        score={data.ups}
        timestamp={getTimeStamp(data.created_utc)}
        type={"top-level-comment"}
      />
    );
  });

  useEffect(() => {
    if (threadStatus === "idle") {
      dispatch(setThreadData(""));
      dispatch(
        fetchThread({
          link: `https://www.reddit.com/r/${subredditName}/comments/${redditId}/${threadTitle}`,
          sortType: sortType,
          requestType: "thread",
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
          {!threadData && (
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
