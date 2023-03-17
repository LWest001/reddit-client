import parse, { domToReact } from "html-react-parser";
import showdown from "showdown";

function parseMarkdownText(markdown) {
  // convert any HTML entities to unicode character, then convert markdown to HTML
  const converter = new showdown.Converter();
  let txt = document.createElement("textarea");
  txt.innerHTML = markdown;
  const html = converter.makeHtml(txt.value);

  // parse html to DOM object
  const selfText = parse(html);
  console.log(html);
  return selfText;
}

export default parseMarkdownText;
