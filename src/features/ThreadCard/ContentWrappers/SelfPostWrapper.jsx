import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "../FlairBox";
import theme from "../../../assets/theme";
import ThreadTitle from "../ThreadTitle";
import { useContext } from "react";
import { ThreadTitleContext } from "../ThreadCard";

function SelfPostWrapper({ text, flair }) {
const title = useContext(ThreadTitleContext)

  const bodyTextHTML = parseMarkdownText(text);
  const defaultFlair = {
    text: "Text post",
    backgroundColor: theme.palette.primary.main,
    textColor: "light",
  };
  if (text) {
    return (
      <Accordion className="SelfPostWrapper">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            {<FlairBox flair={flair?.text ? flair : defaultFlair} />}
            <span className="threadTitle">{title}</span>
          </div>
        </AccordionSummary>

        <AccordionDetails>{bodyTextHTML}</AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <ThreadTitle
        className="SelfPostWrapper"
        flair={flair?.text ? flair : defaultFlair}
      />
    );
  }
}
export default SelfPostWrapper;
