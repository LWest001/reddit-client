import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "./FlairBox";

function SelfPost({ text, title, flair }) {
  const bodyTextHTML = parseMarkdownText(text);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FlairBox flair={flair} />
        {title}
      </AccordionSummary>

      <AccordionDetails>{bodyTextHTML}</AccordionDetails>
    </Accordion>
  );
}
export default SelfPost;
