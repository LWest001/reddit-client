export const getTimeStamp = (created_utc) => {
  const today = new Date(Date.now()).toLocaleDateString();
  const createdDate = new Date(created_utc * 1000).toLocaleDateString();
  if (today === createdDate) {
    return new Date(created_utc * 1000).toLocaleTimeString(navigator.language, {
      timeStyle: "short",
    });
  }
  return new Date(created_utc * 1000).toLocaleDateString(
    navigator.language,
    {}
  );
};
