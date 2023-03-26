// Library imports
import { useSelector } from "react-redux";

// Slice imports
import {
  selectThreadsStatus,
  selectAllThreads,
  selectQuery,
  selectSubredditThreads,
  selectSearchThreads,
  selectIcons,
} from "./threadListSlice";

// Component imports
import ThreadCard from "../ThreadCard/ThreadCard";
import SearchCard from "../SearchCard/SearchCard";
import SkeletonThreadCard from "../ThreadCard/SkeletonThreadCard";
import SkeletonSearchCard from "../SearchCard/SkeletonSearchCard";
import SubredditInfo from "../../components/SubredditInfo";
import { Box } from "@mui/material";
import LazyLoad from "react-lazy-load";

// Function imports
import useFetchThreads from "../../functions/useFetchThreads";

const ThreadList = ({ view }) => {
  //   Selectors
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const subredditThreadsData = useSelector(selectSubredditThreads);
  const searchThreadsData = useSelector(selectSearchThreads);
  const query = useSelector(selectQuery);

  // Set title
  if (view === "homepage") {
    document.title = "rLite | Home ";
  } else if (view === "searchResults") {
    document.title = `rLite | Search results: ${query}`;
  }
  // Generate list
  let searchResults;
  let threads;
  if (view !== "searchResults") {
    const viewData = view === "subreddit" ? subredditThreadsData : threadsData;
    threads = viewData.map((thread) => {
      return (
        <LazyLoad offset={window.innerHeight * 3} key={thread.id}>
          <ThreadCard
            id={thread.id}
            author={thread.author}
            cardType={view}
            commentCount={thread.commentCount}
            galleryCaptions={thread.galleryCaptions}
            galleryData={thread.galleryData}
            icon={thread.icon}
            image={
              ["image", "video"].includes(thread.threadType) && {
                fullSizeImage: thread.image,
                previewSizeImage: thread.imagePreview,
              }
            }
            link={thread.link}
            flair={thread.postFlair}
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
    searchResults = searchThreadsData.map((thread) => {
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
          <SkeletonSearchCard />
          <SkeletonSearchCard />
          <SkeletonSearchCard />
          <SkeletonSearchCard />
          <SkeletonSearchCard />
        </Box>
      );
    }
    return (
      <Box>
        <SkeletonThreadCard />
        <SkeletonThreadCard />
      </Box>
    );
  };

  useFetchThreads(view);



  return (
    <Box className="ThreadList">
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
