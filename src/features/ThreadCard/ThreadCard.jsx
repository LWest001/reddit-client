// Library imports
import { createContext } from "react";
import { Link } from "react-router-dom";

// Component imports
import ThreadCardSubheader from "./ThreadCardSubheader";
import ThreadTitle from "./ThreadTitle";

// Function imports
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";

// Media imports

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

// Stylesheet
import "./ThreadCard.css";

// MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

// Content Wrapper imports
import ImageWrapper from "./ContentWrappers/ImageWrapper";
import LinkPostWrapper from "./ContentWrappers/LinkPostWrapper";
import SelfPostWrapper from "./ContentWrappers/SelfPostWrapper";
import GalleryWrapper from "./ContentWrappers/GalleryWrapper";
import DashVideoWrapper from "./ContentWrappers/DashVideoWrapper";
import RichVideoWrapper from "./ContentWrappers/RichVideoWrapper";

import theme from "../../assets/theme";
import ThreadCardHeaderTitle from "./ThreadCardHeaderTitle";
import replaceEntities from "../../functions/replaceEntities";
import SubredditAvatar from "../../components/SubredditAvatar";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";

export const ThreadContentContext = createContext({});

const ThreadCard = ({ data, cardType }) => {
  let { preview, score, selftext } = data;

  const threadType = getThreadType(data);
  const thumbnail = getDefaultThumbnail(data.thumbnail);
  return (
    <Card className="ThreadCard" id={data.id}>
      <CardHeader
        className="ThreadCardHeader"
        avatar={
          cardType !== "subreddit" && (
            <SubredditAvatar
              subredditName={data.subreddit}
              alt="Subreddit avatar"
            />
          )
        }
        title={
          cardType !== "subreddit" && (
            <ThreadCardHeaderTitle
              subredditName={data.subreddit}
              timestamp={getTimeStamp(data.created_utc)}
            />
          )
        }
        subheader={
          <ThreadCardSubheader
            author={data.author}
            timestamp={cardType === "subreddit" && data.timestamp}
          />
        }
      />

      <ThreadContentContext.Provider value={data}>
        <CardContent className="threadPreview">
          {["image", "video", "richVideo"].includes(threadType) && (
            <ThreadTitle />
          )}

          <Box className="threadContentPreview">
            {threadType == "image" && (
              <ImageWrapper
                preview={data.preview}
                url={data.url}
                link={data.permalink}
              />
            )}

            {threadType == "gallery" && <GalleryWrapper />}

            {threadType === "link" && (
              <LinkPostWrapper url={data.url} thumbnail={thumbnail} />
            )}

            {threadType === "video" && (
              <DashVideoWrapper
                data={data.media.reddit_video}
                previewUrl={replaceEntities(
                  preview.images[0].resolutions.at(-1).url
                )}
              />
            )}

            {threadType === "self" && <SelfPostWrapper text={selftext} />}

            {threadType === "richVideo" && (
              <RichVideoWrapper
                url={replaceEntities(data.url)}
                richVideo={data.secure_media.oembed}
              />
            )}
          </Box>
        </CardContent>
      </ThreadContentContext.Provider>
      <Stack
        className="threadFooter"
        direction="row"
        sx={{
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.headerGradient.default,
          width: "100%",
        }}
      >
        {cardType !== "thread" && (
          <Button
            component={Link}
            to={data.permalink}
            className="viewComments button"
            sx={{ gap: 1 }}
          >
            <CommentOutlinedIcon />
            <Typography>View {data.num_comments} comments</Typography>
          </Button>
        )}
        <Stack direction="row" gap={1}>
          <ThumbUpOutlinedIcon />
          {score}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ThreadCard;
