import { Skeleton, Card, Stack, CardHeader, CardContent } from "@mui/material";

function SkeletonSearchCard() {
  return (
    // <Card
    //   className="SearchCard"
    //   sx={{
    //     borderRadius: 0,
    //     my: 0,
    //     ":first-of-type": {
    //       borderTopLeftRadius: "calc(var(--radius) + var(--border))",
    //       borderTopRightRadius: "calc(var(--radius) + var(--border))",
    //       marginTop: "calc(var(--appbar-height) + 0.5rem)",
    //     },
    //     ":last-of-type": {
    //       borderBottomLeftRadius: "calc(var(--radius) + var(--border))",
    //       borderBottomRightRadius: "calc(var(--radius) + var(--border))",
    //       marginTop: "calc(var(--appbar-height) + 0.5rem)",
    //     },
    //   }}
    // >
    //   <CardHeader
    //     className="searchCardHeader"
    //     avatar={
    //       <SubredditLink
    //         subredditName={subredditName}
    //         display={`r/${subredditName}`}
    //         type="avatar"
    //       />
    //     }
    //     title={
    //       <SearchCardHeaderTitle
    //         subredditName={subredditName}
    //         author={author}
    //         timestamp={timestamp}
    //       />
    //     }
    //     subheader={
    //       <Stack
    //         className="SearchStats"
    //         direction="row"
    //         gap={1}
    //         sx={{
    //           alignItems: "center",
    //         }}
    //       >
    //         <Stack direction="row" gap={1}>
    //           <CommentOutlinedIcon fontSize="small" /> {commentCount}
    //         </Stack>
    //         <Stack direction="row" gap={1}>
    //           <ThumbUpOutlinedIcon fontSize="small" />
    //           {score}
    //         </Stack>
    //       </Stack>
    //     }
    //     sx={{
    //       borderRadius: 0,
    //       p: 0.5,
    //       background:
    //         "radial-gradient(ellipse at top left, #ffffff, lightgray)",
    //     }}
    //   />
    //   <CardContent className="threadPreview" sx={{ p: 0 }}>
    //     <Link
    //       to={`/${link.substring(19)}`}
    //       onClick={() => {
    //         dispatch(setThreadStatus("idle"));
    //         dispatch(setPermalink(link));
    //       }}
    //     >
    //       <Stack direction="row" sx={{ justifyContent: "space-between" }}>
    //         <Box width="100%" sx={{ m: 1 }}>
    //           <SearchFlair threadType={threadType}>{threadType}</SearchFlair>
    //           <Typography>{threadTitle}</Typography>
    //         </Box>

    //         <img className="thumbnail" src={thumbnail} alt="Thumbnail" />
    //       </Stack>
    //     </Link>
    //   </CardContent>
    // </Card>
    <div className="SearchCard skeleton">
      <div className="searchCardBody">
        <div className="searchCardHeader">
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          ></Skeleton>
          <Skeleton
            animation="wave"
            className="subredditAndAuthor skeletonContent"
          ></Skeleton>
        </div>
        <div className="threadPreview">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={30}
            className="threadTitle skeletonContent"
          />
        </div>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={15}
          sx={{ fontSize: "10rem" }}
          className="searchCardFooter skeletonContent"
        />
      </div>

      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ height: "80px", width: "96px" }}
        // className="thumbnailContainer"
      ></Skeleton>
    </div>
  );
}

export default SkeletonSearchCard;
