// Library imports
import { useSelector } from "react-redux";

// Slice imports
import {
  selectThreadsStatus,
  selectAllThreads,
  selectQuery,
} from "./threadListSlice";

// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import SubredditInfo from "../../components/SubredditInfo";

// Function imports
import useFetchThreads from "../../functions/useFetchThreads";
import selectImagePreview from "../../functions/selectImagePreview";

// Stylesheet imports
import "./Subreddit.css";
import { Box } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import LazyLoad from "react-lazy-load";

const ThreadList = ({ view }) => {
  //   Selectors
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const query = useSelector(selectQuery);

  // Set title
  if (view === "homepage") {
    document.title = `rLite | Home `;
  } else if (view === "searchResults") {
    document.title = `rLite | Search results: ${query}`;
  }
  // Generate list
  let searchResults;
  let threads;
  if (view !== "searchResults") {
    threads = threadsData.map((thread) => {
      return (
        <LazyLoad
        
          offset={window.innerHeight * 3}
        >
          <ThreadCard
            key={thread.id}
            id={thread.id}
            author={thread.author}
            cardType={view}
            commentCount={thread.commentCount}
            gallery={thread.gallery}
            icon={thread.icon}
            image={
              ["image", "video"].includes(thread.threadType) && {
                fullSizeImage: thread.image,
                previewSizeImage: selectImagePreview(thread.imagePreview)
                  .preview,
                placeholderImage: selectImagePreview(thread.imagePreview)
                  .placeholder,
              }
            }
            link={thread.link}
            postFlair={thread.postFlair}
            redditId={thread.redditId}
            richVideo={thread.richVideo}
            score={thread.score}
            selfText={thread.selfText}
            subredditName={thread.subredditName}
            threadTitle={thread.threadTitle}
            threadType={thread.threadType}
            thumbnail={thread.thumbnail}
            timestamp={thread.timestamp}
            url={thread.url}
            video={thread.video}
          />
        </LazyLoad>
      );
    });
  }

  if (view === "searchResults") {
    searchResults = threadsData.map((thread) => {
      return (
        <SearchCard
          key={thread.id}
          id={thread.id}
          author={thread.author}
          commentCount={thread.commentCount}
          icon={thread.icon}
          link={thread.link}
          score={thread.score}
          subredditName={thread.subredditName}
          threadTitle={thread.threadTitle}
          threadType={thread.threadType}
          thumbnail={thread.thumbnail}
          timestamp={thread.timestamp}
        />
      );
    });
  }

  // Generate skeletons
  const skeletons = () => {
    if (view === "searchResults") {
      return (
        <Box>
          <SkeletonSearchCard animation="wave" />
          <SkeletonSearchCard animation="wave" />
          <SkeletonSearchCard animation="wave" />
          <SkeletonSearchCard animation="wave" />
          <SkeletonSearchCard animation="wave" />
        </Box>
      );
    }
    return (
      <Box>
        <SkeletonThreadCard animation="wave" />
        <SkeletonThreadCard animation="wave" />
      </Box>
    );
  };

  useFetchThreads(view);

  return (
    <Box>
      {view === "subreddit" && <SubredditInfo />}
      {threadsStatus === "loading" && skeletons()}
      {(threadsStatus === "succeeded" || threadsStatus === "loadMore") &&
        searchResults &&
        view === "searchResults" &&
        searchResults}
      {(threadsStatus === "succeeded" || threadsStatus === "loadMore") &&
        threads &&
        view !== "searchResults" &&
        threads}
    </Box>
  );
};

export default ThreadList;
