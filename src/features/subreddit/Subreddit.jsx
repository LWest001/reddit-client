import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "../homepage/homepageSlice";
import { useEffect, useState } from "react";
import {
  selectThreadsStatus,
  selectAllThreads,
} from "../homepage/homepageSlice";
import ThreadCard from "../threadCard/ThreadCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Subreddit.css";

const Subreddit = () => {
  const [subredditInfo, setSubredditInfo] = useState({});
  const dispatch = useDispatch();
  const threadsStatus = useSelector(selectThreadsStatus);
  const threadsData = useSelector(selectAllThreads);
  const { sortType, subredditName } = useParams();

  const threads = threadsData.map((thread) => {
    return (
      <ThreadCard
        cardType="subreddit"
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
        commentCount={thread.commentCount}
      />
    );
  });

  useEffect(() => {
    async function getIcon(subredditName) {
      const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
      const response = await axios.get(URL);
      setSubredditInfo(response.data.data);
    }
    getIcon(subredditName);
  }, [window.URL]);

  useEffect(() => {
    if (threadsStatus === "idle") {
      dispatch(fetchThreads({ subredditName: subredditName }));
    }
  }, [threadsStatus, sortType, dispatch]);
  return (
    <>
      {threadsStatus === "loading" && "Loading..."}
      <section className="subredditInfo">
        {subredditInfo.icon_img ? (
          <img
            src={subredditInfo.icon_img}
            alt="Subreddit icon"
            className="subredditIcon"
          />
        ) : (
          <div className="subredditIcon placeholder">r/</div>
        )}
        <h1 className="subredditTitle">{subredditInfo.title}</h1>
        <h2 className="subredditSubtitle">
          {subredditInfo.display_name_prefixed}
        </h2>
      </section>
      {threadsStatus === "succeeded" && threads}
    </>
  );
};

export default Subreddit;
