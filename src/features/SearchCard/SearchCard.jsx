import { Link } from "react-router-dom";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import SearchCardHeaderTitle from "./SearchCardHeaderTitle";
import SearchFlair from "./SearchFlair";
import SubredditAvatar from "../../components/SubredditAvatar";
import { getTimeStamp } from "../../functions/getTimeStamp";

const SearchCard = ({ data, threadType }) => {
  const thumbnail = getDefaultThumbnail(data.thumbnail);

  return (
    <Card
      className="SearchCard"
      id={data.id}
      sx={{
        borderRadius: 0,
        my: 0,
        ":first-of-type": {
          borderTopLeftRadius: "calc(var(--radius) + var(--border))",
          borderTopRightRadius: "calc(var(--radius) + var(--border))",
          marginTop: "calc(var(--appbar-height) + 0.5rem)",
        },
        ":last-of-type": {
          borderBottomLeftRadius: "calc(var(--radius) + var(--border))",
          borderBottomRightRadius: "calc(var(--radius) + var(--border))",
        },
      }}
    >
      <CardHeader
        className="searchCardHeader"
        avatar={<SubredditAvatar subredditName={data.subreddit} />}
        title={
          <SearchCardHeaderTitle
            subredditName={data.subreddit}
            author={data.author}
            timestamp={getTimeStamp(data.created_utc)}
          />
        }
        subheader={
          <Stack
            className="SearchStats"
            direction="row"
            gap={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Stack direction="row" gap={1}>
              <CommentOutlinedIcon fontSize="small" /> {data.num_comments}
            </Stack>
            <Stack direction="row" gap={1}>
              <ThumbUpOutlinedIcon fontSize="small" />
              {data.score}
            </Stack>
          </Stack>
        }
        sx={{
          borderRadius: 0,
          p: 0.5,
          background:
            "radial-gradient(ellipse at top left, #ffffff, lightgray)",
        }}
      />
      <CardContent className="threadPreview" sx={{ p: 0 }}>
        <Link to={data.permalink}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box width="100%" sx={{ m: 1 }}>
              <SearchFlair threadType={threadType} />
              <Typography>{data.title}</Typography>
            </Box>

            <img
              className="thumbnail"
              src={thumbnail}
              alt="Thumbnail"
              width="96px"
              height="auto"
            />
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
