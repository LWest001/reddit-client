import axios from "axios";

export async function getThreads(options) {
  const { sortType = "hot", subredditName, query, after } = options;
  const baseURL = "https://www.reddit.com";
  let URL;
  let isFetchingMore = false;
  if (subredditName) {
    if (sortType) {
      URL = `/r/${subredditName}/${sortType}.json`;
    } else {
      URL = `/r/${subredditName}.json`;
    }
  } else if (query) {
    URL = `/search.json?q=${query}&sort=${sortType}`;
  } else {
    URL = `/${sortType}.json`;
  }

  if (after) {
    isFetchingMore = true;
    if (query) {
      URL = `${URL}&after=${after}`;
    } else {
      URL = `${URL}?after=${after}`;
    }
  }

  console.log(URL);

  const response = await axios.get(baseURL + URL);
  return {
    threads: response.data.data.children,
    after: response.data.data.after,
    isFetchingMore,
    query,
    subredditName,
  };
}

export async function getThread(subreddit, id) {
  const baseURL = "https://www.reddit.com";
  const url = `/r/${subreddit}/comments/${id}/phone_dead_about_to_explode.json?sort=hot`;
  const response = await axios.get(baseURL + url);
  return {
    thread: response.data[0].data.children[0].data,
    comments: response.data[1].data.children,
  };
}

export async function getReply(subreddit, threadId, threadTitle, replyId) {
  const url = `https://www.reddit.com/r/${subreddit}/comments/${threadId}/${threadTitle}/${replyId}.json`;
  const response = await axios.get(url);
  return response.data[1].data.children[0].data;
}
