import "./ThreadCard.css";

const ThreadCard = ({
  subredditAvatar,
  id,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  awards,
  gallery,
  image,
  link,
  richVideo,
  selftext,
  threadType,
  thumbnail,
  video,
}) => {
  const readMoreHandler = (e) => {

  }
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
        <div className="threadContentPreview">
          {image && (
            <a href={image}>
              <img src={image} alt={`Image for thread: ${threadTitle}`} />
            </a>
          )}
          {gallery && (
            <>
              GALLERY
              <a href={gallery}>
                <img
                  className="thumbnail"
                  src={thumbnail}
                  alt={`Thumbnail for thread: ${threadTitle}`}
                />
              </a>
            </>
          )}
          {threadType === "link" && (
            <img
              src={thumbnail}
              alt={`Thumbnail for thread: ${threadTitle}`}
              className="thumbnail"
            />
          )}
          {video && (
            <>
              <video controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className="vid-audio-message">
                Sorry! Reddit Client does not yet support video with audio.
                Click View Comments below to navigate to the Reddit page with
                audio.
              </span>
            </>
          )}
          {selftext && (
            <>
              <p className="selftext previewtext">
                {selftext.substring(0, 150)}...
              </p>
              <p className="selftext fulltext">{selftext}</p>
              <button className="readMore">Read more</button>
            </>
          )}
          {/* Rich Video: basically it sends html that embeds a video*/}
        </div>
      </div>
      <p>
        <a href={link}>
          <button className="viewComments">🗨️View comments</button>
        </a>
        <span>👍{score}</span>
      </p>
    </div>
  );
};

export default ThreadCard;
