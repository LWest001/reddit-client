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
            animation="wave"
          />
        )}
        <h1 className="subredditTitle">
          {subredditInfo.title || <Skeleton animation="wave" />}
        </h1>
        <h2 className="subredditSubtitle">
          {subredditInfo.display_name_prefixed || <Skeleton animation="wave" />}
        </h2>
        {subredditInfo.public_description ? (
          <p className="subredditDescription">
            {parseMarkdownText(subredditInfo.public_description)}
          </p>
        ) : (
          <Skeleton
            variant="text"
            className="subredditDescription"
            animation="wave"
          />
        )}
      </section>
    </div>
  );
}

export default SubredditInfo;
