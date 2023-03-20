import "./SearchCard.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import { setStatus as setThreadStatus } from "../Thread/threadSlice";
import SubredditLink from "../../components/SubredditLink";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import theme from "../../assets/theme";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import SearchCardHeaderTitle from "./SearchCardHeaderTitle";
import { fetchIcon, selectIcons } from "../ThreadList/threadListSlice";
import SearchFlair from "./SearchFlair";

const SearchCard = ({
  id,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  link,
  threadType,
  thumbnail,
  commentCount,
}) => {
  const dispatch = useDispatch();
  thumbnail = getDefaultThumbnail(thumbnail);
  const icons = useSelector(selectIcons);

  useEffect(() => {
    if (!Object.hasOwn(icons, subredditName)) {
      dispatch(fetchIcon(subredditName));
    }
  }, []);

  return (
    <Card
      className="SearchCard"
      id={id}
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
        avatar={
          <SubredditLink
            subredditName={subredditName}
            display={`r/${subredditName}`}
            type="avatar"
          />
        }
        title={
          <SearchCardHeaderTitle
            subredditName={subredditName}
            author={author}
            timestamp={timestamp}
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
              <CommentOutlinedIcon fontSize="small" /> {commentCount}
            </Stack>
            <Stack direction="row" gap={1}>
              <ThumbUpOutlinedIcon fontSize="small" />
              {score}
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
        <Link
          to={`/${link.substring(19)}`}
          onClick={() => {
            dispatch(setThreadStatus("idle"));
            dispatch(setPermalink(link));
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box width="100%" sx={{ m: 1 }}>
              <SearchFlair threadType={threadType}>{threadType}</SearchFlair>
              <Typography>{threadTitle}</Typography>
            </Box>

            <img className="thumbnail" src={thumbnail} alt="Thumbnail" />
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
