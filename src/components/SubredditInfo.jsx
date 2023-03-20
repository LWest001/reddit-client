import { useEffect, useState } from "react";
import parseMarkdownText from "../functions/parseMarkdownText";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Skeleton,
  Typography,
  Card,
  Stack,
  CardHeader,
  CardContent,
  Avatar,
} from "@mui/material";
import DefaultIcon from "/logoTransparent.png";
import replaceEntities from "../functions/replaceEntities";

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
    <Card
      className="SubredditInfoContainer"
      sx={{
        background:
          subredditInfo.banner_background_image &&
          `url(${replaceEntities(
            subredditInfo.banner_background_image
          )}) no-repeat center`,
        backgroundSize: "cover",
        justifyContent: "space-between",
        mt: "calc(var(--appbar-height) + 0.5rem)",
        minHeight: "min-content",
        color:"white"
      }}
    >
      <CardHeader
        sx={{
          background: "none",
          bgcolor: "rgba(0, 0, 0, 0.6)",
        }}
        avatar={
          subredditInfo ? (
            <Avatar
              src={subredditInfo.icon_img || DefaultIcon}
              sx={{ bgcolor: "white" }}
            />
          ) : (
            <Skeleton
              variant="circular"
              width="128px"
              height="128px"
              className="subredditIcon placeholder"
              animation="wave"
            />
          )
        }
        title={subredditInfo.title || <Skeleton animation="wave" />}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "white", fontSize: 24 },
          variant: "h1",
        }}
        subheaderTypographyProps={{
          sx: { fontWeight: "bold", color: "white" },
        }}
        subheader={
          subredditInfo.display_name_prefixed || <Skeleton animation="wave" />
        }
      />
      <CardContent
        sx={{
          px: 2,
          py: 0.5,
          display: "flex",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {subredditInfo.public_description ? (
          parseMarkdownText(subredditInfo.public_description)
        ) : (
          <Skeleton
            variant="text"
            className="subredditDescription"
            animation="wave"
          />
        )}
      </CardContent>
    </Card>
  );
}

export default SubredditInfo;
