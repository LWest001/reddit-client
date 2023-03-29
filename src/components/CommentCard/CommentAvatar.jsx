import { Avatar, Badge, Box, styled } from "@mui/material";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import stringAvatar from "../../functions/stringAvatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 7,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0",
  },
}));

export default function CommentAvatar({ isOp, author, id }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <StyledBadge badgeContent={"👑"} invisible={!isOp} color="secondary">
        <Avatar
          {...stringAvatar(author)}
          variant="rounded"
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.innerHTML = author;
              e.target.style.width = "100%";
              e.target.style.maxWidth = "fit-content";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile && !clicked) {
              e.target.innerHTML = author.substring(0, 1).toUpperCase();
              e.target.style.width = "1.4rem";
            }
          }}
          onClick={(e) => {
            const text = document.querySelector(`#CommentHeaderText-${id}`);
            if (!clicked) {
              setClicked(true);
              e.target.innerHTML = author;
              e.target.style.width = "100%";
              e.target.style.maxWidth = "fit-content";
              if (isMobile) {
                text.style.display = "none";
              }
            } else {
              setClicked(false);
              e.target.innerHTML = author.substring(0, 1).toUpperCase();
              e.target.style.width = "1.4rem";
              if (isMobile) {
                text.style.display = "flex";
              }
            }
          }}
        />
      </StyledBadge>
    </Box>
  );
}
