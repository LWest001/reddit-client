import axios from "axios";

export async function getThreads(options) {
  const { sort = "hot", subredditName, query, after } = options;
  const baseURL = "https://www.reddit.com";
  let URL;
  let isFetchingMore = false;
  if (subredditName) {
    if (sort) {
      URL = `/r/${subredditName}/${sort}.json`;
    } else {
      URL = `/r/${subredditName}.json`;
    }
  } else if (query) {
    URL = `/search.json?q=${query}&sort=${sort}`;
  } else {
    URL = `/${sort}.json`;
  }

  if (after) {
    isFetchingMore = true;
    if (query) {
      URL = `${URL}&after=${after}`;
    } else {
      URL = `${URL}?after=${after}`;
    }
  }

  const response = await axios.get(baseURL + URL);
  return {
    threads: response.data.data.children,
    after: response.data.data.after,
    isFetchingMore,
    query,
    subredditName,
  };
}

export async function getThread(subreddit, id, sort = "hot") {
  const baseURL = "https://www.reddit.com";
  const url = `/r/${subreddit}/comments/${id}.json?sort=${sort}`;
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
