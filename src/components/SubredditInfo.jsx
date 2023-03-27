import { useEffect, useState } from "react";
import parseMarkdownText from "../functions/parseMarkdownText";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import replaceEntities from "../functions/replaceEntities";
import SubredditAvatar from "./SubredditAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDown";

function SubredditInfo() {
  const [subredditInfo, setSubredditInfo] = useState({});
  const { subredditName } = useParams();

  document.title = `rLite | r/${subredditName}`;

  useEffect(() => {
    async function getSubredditInfo(subredditName) {
      const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
      const response = await axios.get(URL);
      setSubredditInfo(response.data.data);
    }
    getSubredditInfo(subredditName);
  }, [window.URL]);

  return (
    <Card
      className="SubredditInfoContainer"
      sx={{
        background:
          window.innerWidth < 600 && subredditInfo.mobile_banner_image
            ? `url(${replaceEntities(
                subredditInfo.mobile_banner_image
              )}) no-repeat center`
            : subredditInfo.banner_background_image &&
              `url(${replaceEntities(
                subredditInfo.banner_background_image
              )}) no-repeat center`,
        backgroundSize: "cover",
        justifyContent: "space-between",
        mt: "calc(var(--appbar-height) + 0.5rem)",
        minHeight: "min-content",
        color: "white",
      }}
    >
      <CardHeader
        sx={{
          background: "none",
          bgcolor: "rgba(0, 0, 0, 0.6)",
        }}
        avatar={<SubredditAvatar subredditName={subredditName} disabled />}
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
          flexDirection: "column",
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
        {subredditInfo.description && (
          <Accordion
            sx={{
              bgcolor: "transparent",
              color: "white",
              flexDirection: "column",
              a: {
                color: "white",
                textDecoration: "underline",
              },
              // "p, h1, h2, h3, h4, h5, h6": {
              "*": {
                mb: 2,
              },
              li: {
                listStyle: "initial",
              },
              "*:last-child": {
                marginBottom: "0",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon htmlColor="white" />}
              sx={{
                ".MuiAccordionSummary-contentGutters": { display: "none" },
              }}
            ></AccordionSummary>
            <AccordionDetails>
              {" "}
              {subredditInfo.public_description ? (
                parseMarkdownText(subredditInfo.description)
              ) : (
                <Skeleton
                  variant="text"
                  className="subredditDescription"
                  animation="wave"
                />
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

export default SubredditInfo;
