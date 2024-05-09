import { Link } from "@mui/material";
import parse, { domToReact } from "html-react-parser";
import showdown from "showdown";
import BlockQuote from "../components/BlockQuote";

function parseMarkdownText(markdown) {
  // convert any HTML entities to unicode character, then convert markdown to HTML
  const converter = new showdown.Converter();
  let txt = document.createElement("textarea");
  txt.innerHTML = markdown;
  const html = converter.makeHtml(txt.value);
  // parse html to DOM object
  const selfText = parse(html, {
    replace(domNode) {
      if (
        domNode?.attribs?.href &&
        domNode.attribs.href.includes("preview.redd.it")
      ) {
        return (
          <img src={domNode.attribs.href} style={{ maxWidth: "100%" }}></img>
        );
      }
      if (
        domNode?.attribs?.href &&
        !domNode.attribs.href.includes("preview.redd.it")
      ) {
        return (
          <Link href={domNode.attribs.href} target="_blank">
            {domNode.children[0]?.data}
          </Link>
        );
      }
      if (domNode.name === "blockquote") {
        return <BlockQuote>{domToReact(domNode.children)}</BlockQuote>;
      }
    },
  });

  return selfText;
}

export default parseMarkdownText;
