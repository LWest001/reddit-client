import { useEffect, useState } from "react";
import parseMarkdownText from "../functions/parseMarkdownText";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

function SubredditInfo() {
  const [subredditInfo, setSubredditInfo] = useState({});
  const { subredditName } = useParams();
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
        {subredditInfo.icon_img ? (
          <img
            src={subredditInfo.icon_img}
            alt="Subreddit icon"
            className="subredditIcon"
          />
        ) : (
          <div className="subredditIcon placeholder">r/</div>
        )}
        <Typography variant="h1" className="subredditTitle">
          {subredditInfo.title}
        </Typography>
        <Typography variant="h2" className="subredditSubtitle">
          {subredditInfo.display_name_prefixed}
        </Typography>
        <p
          className="subredditDescription"
          dangerouslySetInnerHTML={{
            __html: parseMarkdownText(subredditInfo.public_description),
          }}
        ></p>
      </section>
    </div>
  );
}

export default SubredditInfo;
