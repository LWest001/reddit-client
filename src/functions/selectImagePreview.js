function selectImagePreview(resolutions) {
  let parsedUrl;
  if (Array.isArray(resolutions)) {
    for (const resolution of resolutions) {
      if (resolution.height >= 460) {
        parsedUrl = resolution.url.replace(/&amp;/g, "&");
        break;
      } else {
        parsedUrl = resolutions[resolutions.length - 1].url.replace(
          /&amp;/g,
          "&"
        );
      }
    }
  }
  return parsedUrl;
}

export default selectImagePreview;
