import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectThreadsStatus,
  selectAllThreads,
  fetchThreads,
} from "../homepage/homepageSlice";
import ThreadCard from "../threadCard/ThreadCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Subreddit.css";
import SkeletonThreadCard from "../threadCard/SkeletonThreadCard";
import parseMarkdownText from "../../functions/parseMarkdownText";

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
        gallery={thread.gallery}
        redditId={thread.redditId}
        icon={thread.icon}
        image={thread.image}
        link={thread.link}
        thumbnail={thread.thumbnail}
        richVideo={thread.richVideo}
        selfText={thread.selfText}
        threadType={thread.threadType}
        video={thread.video}
        commentCount={thread.commentCount}
        postFlair={thread.postFlair}
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
      dispatch(
        fetchThreads({ subredditName: subredditName, sortType: sortType })
      );
    }
  }, [threadsStatus, sortType, dispatch]);
  return (
    <>
      <div className="subredditInfoContainer">
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
          <p
            className="subredditDescription"
            dangerouslySetInnerHTML={{
              __html: parseMarkdownText(subredditInfo.public_description),
            }}
          ></p>
        </section>
      </div>
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

export default Subreddit;
