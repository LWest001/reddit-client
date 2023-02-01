import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectThreadsStatus,
  selectAllThreads,
  fetchThreads,
  selectAfter,
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
  const after = useSelector(selectAfter);

  const threads = threadsData.map((thread) => {
    return (
      <ThreadCard
        key={thread.keyId}
        id={thread.keyId}
        author={thread.author}
        cardType="subreddit"
        commentCount={thread.commentCount}
        gallery={thread.gallery}
        icon={thread.icon}
        image={thread.image}
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
        video={thread.video}
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
        fetchThreads({
          subredditName: subredditName,
          sortType: sortType ? sortType : "hot",
        })
      );
    } else if (threadsStatus === "loadMore") {
      dispatch(
        fetchThreads({
          subredditName: subredditName,
          sortType: sortType ? sortType : "hot",
          after: after,
        })
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
      {threads && threads}
    </>
  );
};

export default Subreddit;
