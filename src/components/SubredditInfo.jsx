import { useEffect, useMemo, useRef, useState } from "react";
import parseMarkdownText from "../functions/parseMarkdownText";
import { useParams } from "react-router-dom";
import {
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Chip,
  Stack,
  Fade,
} from "@mui/material";

import replaceEntities from "../functions/replaceEntities";
import SubredditAvatar from "./SubredditAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OnlineIcon from "@mui/icons-material/RadioButtonChecked";
import GroupIcon from "@mui/icons-material/Group";
import { useQuery } from "@tanstack/react-query";
import { getSubredditInfo } from "../api";

const BG_TINT = "rgba(0,0,0,0.6)";

function SubredditInfo({ expandedState, headerHeight }) {
  const card = useRef();
  const { subreddit } = useParams();
  const [expanded, setExpanded] = expandedState;
  const margin = `calc(${headerHeight}px)`;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSubredditInfo(subreddit),
    queryKey: [subreddit],
  });

  document.title = `rLite | r/${data?.display_name || subreddit}`;

  const isMobileBanner = data?.mobile_banner_image?.length;
  const isBanner = data?.banner_background_image?.length;
  const smallScreen = window.innerWidth <= 600;

  const bannerImage = useMemo(
    () =>
      smallScreen && isMobileBanner
        ? replaceEntities(data.mobile_banner_image)
        : smallScreen && isBanner
        ? replaceEntities(data.banner_background_image)
        : isBanner
        ? replaceEntities(data.banner_background_image)
        : replaceEntities(data?.mobile_banner_image),
    [data, isMobileBanner, isBanner, smallScreen]
  );

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
        background: bannerImage
          ? `url(${replaceEntities(bannerImage)}) no-repeat top`
          : "black",
        backgroundSize: "cover",
        justifyContent: "space-between",
        minHeight: "min-content",
        color: "white !important",
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
          bgcolor: BG_TINT,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        avatar={!isError && <SubredditAvatar subreddit={subreddit} />}
        title={
          replaceEntities(data?.title) ||
          (isLoading ? (
            <Skeleton animation="wave" />
          ) : (
            isError && `r/${subreddit} doesn't exist.`
          ))
        }
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "white", fontSize: 24 },
          variant: "h1",
        }}
        subheaderTypographyProps={{
          sx: { fontWeight: "bold", color: "white" },
        }}
        subheader={
          data?.display_name_prefixed ||
          (isLoading && <Skeleton animation="wave" />)
        }
      />
      <Collapse in={showContent || expanded}>
        <CardContent
          sx={{
            px: 2,
            py: 0.5,
            justifyContent: "center",
            bgcolor: BG_TINT,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Stack>
            <Stack direction="row" gap={1} my={1} className="SubredditChips">
              {data?.subscribers && (
                <Chip
                  size="small"
                  label={`${data.subscribers} subscribed`}
                  icon={<GroupIcon />}
                  color="info"
                  sx={{ width: "fit-content" }}
                />
              )}
              {data?.accounts_active && (
                <Chip
                  size="small"
                  label={`${data?.accounts_active} active now`}
                  icon={<OnlineIcon />}
                  color="active"
                  sx={{ width: "fit-content" }}
                />
              )}
            </Stack>
          </Stack>
        </CardContent>
        {data?.description && (
          <Accordion
            onChange={(_, expanded) => {
              expanded
                ? setExpanded(expanded)
                : setTimeout(() => setExpanded(expanded), 50);
            }}
            sx={{
              bgcolor: BG_TINT,
              p: 1,
              flexDirection: "column",
              a: {
                color: "white",
                textDecoration: "underline",
              },
              li: {
                listStyle: "initial",
              },
              m: "0 !important",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon htmlColor="white" />}
              sx={{ color: "white !important" }}
            >
              {data?.public_description
                ? parseMarkdownText(data.public_description)
                : isLoading && (
                    <Skeleton
                      variant="text"
                      className="subredditDescription"
                      animation="wave"
                    />
                  )}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                color: "white !important",
                maxHeight: "60vh",
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {data.description
                ? parseMarkdownText(data.description)
                : isLoading && (
                    <Skeleton
                      variant="text"
                      className="subredditDescription"
                      animation="wave"
                    />
                  )}
            </AccordionDetails>
          </Accordion>
        )}
      </Collapse>
    </Card>
  );
}

export default SubredditInfo;
