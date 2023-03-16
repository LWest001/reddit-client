import { useEffect, useState } from "react";
import parseMarkdownText from "../functions/parseMarkdownText";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Skeleton, Typography } from "@mui/material";
import DefaultIcon from "../assets/favicon.svg";

function SubredditInfo() {
  const [subredditInfo, setSubredditInfo] = useState({});
  const { subredditName } = useParams();

  document.title = `rLite | r/${subredditName}`;

  useEffect(() => {
    async function getIcon(subredditName) {
      const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
      const response = await axios.get(URL);
      setSubredditInfo(response.data.data);
    }
    getIcon(subredditName);
  }, [window.URL]);
  return (
    <div className="subredditInfoContainer">
      <section className="subredditInfo">
        {subredditInfo ? (
          <img
            src={subredditInfo.icon_img || DefaultIcon}
            alt="Subreddit icon"
            className="subredditIcon"
          />
        ) : (
          <Skeleton
            variant="circular"
            width="128px"
            height="128px"
            className="subredditIcon placeholder"
          />
        )}
        <h1 className="subredditTitle">
          {subredditInfo.title || <Skeleton />}
        </h1>
        <h2 className="subredditSubtitle">
          {subredditInfo.display_name_prefixed || <Skeleton />}
        </h2>
        {subredditInfo.public_description ? (
          <p
            className="subredditDescription"
            dangerouslySetInnerHTML={{
              __html: parseMarkdownText(subredditInfo.public_description),
            }}
          ></p>
        ) : (
          <Skeleton variant="text" className="subredditDescription" />
        )}
      </section>
    </div>
  );
}

export default SubredditInfo;
