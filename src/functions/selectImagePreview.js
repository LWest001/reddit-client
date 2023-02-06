function selectImagePreview(resolutions) {
  let preview;
  let placeholder;
  if (Array.isArray(resolutions)) {
    placeholder = { url: resolutions[0].url.replace(/&amp;/g, "&") };
    for (const resolution of resolutions) {
      if (resolution.height >= 360) {
        preview = {
          url: resolution.url.replace(/&amp;/g, "&"),
          width: resolution.width,
          height: resolution.height,
        };
        break;
      } else {
        const defaultResolution = resolutions[resolutions.length - 1];
        preview = {
          url: defaultResolution.url.replace(/&amp;/g, "&"),
          width: defaultResolution.width,
          height: defaultResolution.height,
        };
      }
    }
  }
  return { preview: preview, placeholder: placeholder };
}

export default selectImagePreview;
