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
import { getRandomKey } from "../../functions/getRandomKey";

function CommentCard({ author, body, replies, score, timestamp, type }) {
  const bodyTextHTML = parseMarkdownText(body);
  let subcomments;
  if (replies) {
    subcomments = replies.map((subcomment) => {
      if (subcomment.kind === "more") {
        return (
          <button key={subcomment.keyId} id={subcomment.keyId}>
            {subcomment.data.children.length} more replies
          </button>
        );
      }
      subcomment = subcomment.data;
      const keyId = getRandomKey();
      return (
        <CommentCard
          author={subcomment.author}
          body={subcomment.body}
          id={keyId}
          key={keyId}
          replies={subcomment.replies?.data?.children}
          score={subcomment.score}
          timestamp={subcomment.timestamp}
          type="subcomment"
        />
      );
    });
  }

  return (
    <div className={`CommentCard ${type}`}>
      <div className="commentHeader">
        <div className="author">{author}</div>
        <div className="timestamp">{timestamp}</div>
        <div></div>
        <div className="score">
          <img src={upvote} alt="upvote arrow" className="upArrow" />
          {score}
        </div>
      </div>
      <div
        className="commentBody"
        dangerouslySetInnerHTML={{ __html: bodyTextHTML }}
      ></div>
      {subcomments && subcomments}
    </div>
  );
}

export default CommentCard;
