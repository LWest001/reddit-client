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
  Collapse,
} from "@mui/material";

import replaceEntities from "../functions/replaceEntities";
import SubredditAvatar from "./SubredditAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDown";

function SubredditInfo({ expandedState, headerHeight }) {
  const [subredditInfo, setSubredditInfo] = useState({});
  const [bgImage, setBgImage] = useState(null);
  const { subreddit } = useParams();
  const [expanded, setExpanded] = expandedState;

  const margin = `calc(${headerHeight}px)`;

  document.title = `rLite | r/${subreddit}`;

  useEffect(() => {
    async function getSubredditInfo(subreddit) {
      const URL = `https://www.reddit.com/r/${subreddit}/about.json`;
      const response = await axios.get(URL);
      setSubredditInfo(response.data.data);
    }
    getSubredditInfo(subreddit);
    return setSubredditInfo({});
  }, [subreddit]);

  useEffect(() => {
    if (window.innerWidth <= 600 && subredditInfo.mobile_banner_image) {
      setBgImage(subredditInfo.mobile_banner_image);
    } else {
      setBgImage(subredditInfo.banner_background_image);
    }
  }, [subredditInfo, window.innerWidth]);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setShowContent(false) : setShowContent(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Card
      className="SubredditInfoContainer"
      sx={{
        background: bgImage
          ? `url(${replaceEntities(bgImage)}) no-repeat top`
          : "black",
        backgroundSize: "cover",
        justifyContent: "space-between",
        minHeight: "min-content",
        color: "white",
        borderRadius: 0,
        // my: 0,
        mt: margin,
        position: "sticky",
        top: margin,
        zIndex: 1,
      }}
    >
      <CardHeader
        sx={{
          background: "none",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        avatar={<SubredditAvatar subreddit={subreddit} />}
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

      <Collapse in={showContent || expanded}>
        <CardContent
          sx={{
            px: 2,
            py: 0.5,
            justifyContent: "center",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            flexDirection: "column",
            display: "flex",
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
              onChange={(event, expanded) => {
                expanded
                  ? setExpanded(expanded)
                  : setTimeout(() => setExpanded(expanded), 700);
              }}
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
              <AccordionDetails
                sx={{
                  maxHeight: "60vh",
                  overflow: "auto",
                  scrollBehavior: "smooth",
                  scroll,
                }}
              >
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
      </Collapse>
    </Card>
  );
}

export default SubredditInfo;
