export const getHotPage = async () => {
  const url = "https://www.reddit.com/hot.json";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    } else {
      return "invalid";
    }
  } catch (error) {
    console.log(error);
  }
};
