import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "./FlairBox";
import theme from "../../assets/theme";
import ThreadTitle from "./ThreadTitle";

function SelfPost({ text, title, flair }) {
  const bodyTextHTML = parseMarkdownText(text);
  const defaultFlair = {
    text: "Text post",
    backgroundColor: theme.palette.primary.main,
    textColor: "light",
  };
  if (text) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ThreadTitle
            flair={flair?.text ? flair : defaultFlair}
            title={title}
          />
        </AccordionSummary>

        <AccordionDetails>{bodyTextHTML}</AccordionDetails>
      </Accordion>
    );
  } else {
    return <ThreadTitle flair={flair?.text ? flair : defaultFlair} title={title} />;
  }
}
export default SelfPost;