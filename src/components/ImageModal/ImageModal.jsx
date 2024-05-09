import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Popover,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ThreadContentContext } from "../../features/ThreadCard/ThreadCard";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "max-content",
  maxWidth: "100%",
  px: 1,
  py: 2,
  maxHeight: "100%",
};

function ImageModal({ open, handleClose, link, caption, src }) {
  const { title } = useContext(ThreadContentContext);
  const [shareAnchor, setShareAnchor] = useState(null);
  const [expand, setExpand] = useState(false);
  const { threadTitle: titleParam } = useParams();
  const shareOpen = !!shareAnchor;
  const shareId = open ? "share" : undefined;
  const imageHeight = expand ? undefined : "80vh";

  function handleClickShare(e) {
    setShareAnchor(e.currentTarget);
  }

  function handleCloseShare() {
    setShareAnchor(null);
  }

  function handleExpand() {
    console.log(expand);
    setExpand((prev) => !prev);
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, overflow: expand ? "scroll" : "hidden" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          fontSize={16}
        >
          {caption || title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: imageHeight }}
            src={src}
            alt={title}
            className="modalImage"
            onClick={handleExpand}
          />
        </Box>
        <Stack direction="row" justifyContent="space-between" mt={1}>
          {link && !titleParam && (
            <Button
              component={Link}
              variant="contained"
              to={link}
              aria-describedby={shareId}
            >
              <CommentOutlinedIcon />
            </Button>
          )}
          <Popover
            onClose={handleCloseShare}
            id={shareId}
            open={shareOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={shareAnchor}
          >
            <ButtonGroup>
              <IconButton>
                <RedditIcon />
              </IconButton>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <XIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
              <IconButton>
                <EmailIcon />
              </IconButton>
            </ButtonGroup>
          </Popover>
          <Button variant="contained" onClick={handleClickShare}>
            <ShareIcon />
          </Button>
          <Button variant="contained" onClick={handleClose} color="warning">
            <CloseIcon />
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ImageModal;
