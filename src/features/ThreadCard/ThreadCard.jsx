// Library imports
import { createContext } from "react";

// Component imports
import ThreadTitle from "./ThreadTitle";

// Function imports
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";

// Media imports


// Stylesheet
import "./ThreadCard.css";

// MUI imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  useTheme,
} from "@mui/material";

// Content Wrapper imports
import ImageWrapper from "./ContentWrappers/ImageWrapper";
import LinkPostWrapper from "./ContentWrappers/LinkPostWrapper";
import SelfPostWrapper from "./ContentWrappers/SelfPostWrapper";
import GalleryWrapper from "./ContentWrappers/GalleryWrapper";
import DashVideoWrapper from "./ContentWrappers/DashVideoWrapper";
import RichVideoWrapper from "./ContentWrappers/RichVideoWrapper";
import ThreadCardHeaderTitle from "./ThreadCardHeaderTitle";
import replaceEntities from "../../functions/replaceEntities";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import UpvoteChip from "../../components/Chips/UpvoteChip";
import TimestampChip from "../../components/Chips/TimestampChip";
import CommentsChip from "../../components/Chips/CommentsChip";

export const ThreadContentContext = createContext({});

const ThreadCard = ({ data, cardType }) => {
  const theme = useTheme();
  let { preview, score, selftext } = data;

  const threadType = getThreadType(data);
  const thumbnail = getDefaultThumbnail(data.thumbnail);
  return (
    <Card className="ThreadCard" id={data.id}>
      <CardHeader
        className="ThreadCardHeader"
        title={
          <ThreadCardHeaderTitle
            subreddit={data.subreddit}
            timestamp={getTimeStamp(data.created_utc)}
            author={data.author}
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
          background: theme.palette.headerGradient?.default,
          width: "100%",
        }}
      >
        <Stack direction="row" alignItems={"center"} gap={1}>
          <UpvoteChip score={score} />
          <TimestampChip timestamp={getTimeStamp(data.created_utc)} />
        </Stack>
        {cardType !== "thread" && (
          <CommentsChip link={data.permalink} count={data.num_comments} />
        )}
      </Stack>
    </Card>
  );
};

export default ThreadCard;
