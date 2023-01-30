import "./CommentCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Embed, { defaultProviders } from "react-tiny-oembed";
import axios from "axios";
import { setStatus } from "../../features/thread/threadSlice";
import parseMarkdownText from "../../functions/parseMarkdownText";
import ReactPlayer from "react-player";
import upvote from "../../assets/upvote.svg";

function CommentCard({ author, body, timestamp }) {
  const bodyTextHTML = parseMarkdownText(body);
  return (
    <div className="CommentCard">
      <div className="author">{author}</div>
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: bodyTextHTML }}
      ></div>
      <div className="timestamp">{timestamp}</div>
    </div>
  );
}

export default CommentCard;
