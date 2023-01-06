import "./ThreadCard.css";

const ThreadCard = ({
  subredditAvatar,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  awards,
  image,
  link,
  thumbnail,
}) => {
  return (
    <div className="ThreadCard">
      <div className="threadCardSubredditHeader">
        <span>
          {/* Figure out how to get a subreddit avatar url */}
          {/* <img src={subredditAvatar} alt="Subreddit avatar" /> */}
          r/{subredditName}
        </span>{" "}
        <span>{timestamp}</span>
      </div>
      <p className="authorName">u/{author}</p>
      <div className="threadPreview">
        <h2 className="threadTitle">{threadTitle}</h2>
        {["jpg", "png"].includes(image.substring(image.length - 3)) && (
          <img src={image} alt={`Image for thread: ${threadTitle}`} />
        )}
      </div>
      <p>
        <a href={link}>🗨️View comments</a>
        <span>👍{score}</span>
      </p>
    </div>
  );
};

export default ThreadCard;
