function replaceEntities(str) {
  if (!(typeof str === "string")) return;
  return str.replace(/&amp;/g, "&");
}

export default replaceEntities;
