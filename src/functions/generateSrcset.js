function generateImgSrcset(sources, type = "image") {
  let sizes;
  let src;
  let srcset;
  if (type === "image") {
    srcset = `${sources[0]?.url.replace(/&amp;/g, "&")} ${sources[0]?.width}w`;
    sizes = `(max-width: ${sources[0]?.width + 50}px) ${sources[0]?.width}px`;
    src = sources[sources.length - 1]?.url.replace(/&amp;/g, "&");
    for (let i = 1; i < sources.length - 1; i++) {
      srcset = srcset.concat(
        `, ${sources[i]?.url.replace(/&amp;/g, "&")} ${sources[i]?.width}w`
      );
      sizes = sizes.concat(
        `, (max-width: ${sources[i]?.width + 50}px) ${sources[i]?.width}px`
      );
    }
    srcset = srcset.concat(
      `, ${sources[sources.length - 1]?.url.replace(/&amp;/g, "&")} ${
        sources[sources.length - 1]?.width
      }w`
    );

    sizes = sizes.concat(`, ${sources[sources.length - 1]?.width}px`);
  } else if (type === "gallery") {
    srcset = `${sources[0]?.u.replace(/&amp;/g, "&")} ${sources[0]?.x}w`;
    sizes = `(max-width: ${sources[0]?.x + 50}px) ${sources[0]?.x}px`;
    src = sources[sources.length - 1]?.u.replace(/&amp;/g, "&");
    for (let i = 1; i < sources.length - 1; i++) {
      srcset = srcset.concat(
        `, ${sources[i]?.u.replace(/&amp;/g, "&")} ${sources[i]?.x}w`
      );
      sizes = sizes.concat(
        `, (max-width: ${sources[i]?.x + 50}px) ${sources[i]?.x}px`
      );
    }
    srcset = srcset.concat(
      `, ${sources[sources.length - 1]?.u.replace(/&amp;/g, "&")} ${
        sources[sources.length - 1]?.x
      }w`
    );

    sizes = sizes.concat(`, ${sources[sources.length - 1]?.x}px`);
  }

  return {
    srcset,
    sizes,
    src,
  };
}

export default generateImgSrcset;
