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
import { Box, Card, Typography } from "@mui/material";

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

  document.title = `rLite | ${threadData.threadTitle || ""}`;

  const thread = (
    <ThreadCard
      key={threadData.id}
      id={threadData.id}
      author={threadData.author}
      cardType="thread"
      commentCount={threadData.commentCount}
      galleryCaptions={threadData.galleryCaptions}
      galleryData={
        threadData.galleryData
      }
      icon={threadData.icon}
      image={
        ["image", "video"].includes(threadData.threadType) && {
          fullSizeImage: threadData.image,
          previewSizeImage: threadData.imagePreview,
          placeholderImage: selectImagePreview(threadData.imagePreview)
            .placeholder,
        }
      }
      link={threadData.link}
      flair={threadData.postFlair}
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
  let comments;

  if (commentsData.length) {
    comments = commentsData.map((comment) => {
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
  } else {
    comments = (
      <Card sx={{ display: "flex", alignItems: "center", p: 4 }}>
        <Typography>No comments yet!</Typography>
      </Card>
    );
  }

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
    <Box className="Thread">
      {threadStatus === "succeeded" || threadStatus === "loading-subreplies" ? (
        <>
          {thread}
          {comments}
        </>
      ) : (
        <>
          <SkeletonThreadCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
          <SkeletonCommentCard animation="wave" />
        </>
      )}
    </Box>
  );
};

export default Thread;
