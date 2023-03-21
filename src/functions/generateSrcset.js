function generateImgSrcset(sources) {
  let srcset = `${sources[0].url.replace(/&amp;/g, "&")} ${sources[0].width}w`;
  let sizes = `(max-width: ${sources[0].width + 50}px) ${sources[0].width}px`;
  let src = sources[sources.length - 1].url.replace(/&amp;/g, "&");
  for (let i = 1; i < sources.length - 1; i++) {
    srcset = srcset.concat(
      `, ${sources[i].url.replace(/&amp;/g, "&")} ${sources[i].width}w`
    );
    sizes = sizes.concat(
      `, (max-width: ${sources[i].width + 50}px) ${sources[i].width}px`
    );
  }
  srcset = srcset.concat(
    `, ${sources[sources.length - 1].url.replace(/&amp;/g, "&")} ${
      sources[sources.length - 1].width
    }w`
  );

  sizes = sizes.concat(`, ${sources[sources.length - 1].width}px`);

  return {
    srcset,
    sizes,
    src,
  };
}

export default generateImgSrcset;
