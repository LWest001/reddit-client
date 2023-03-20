import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "../FlairBox";
import theme from "../../../assets/theme";
import ThreadTitle from "../ThreadTitle";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";

function SelfPostWrapper({ text }) {
  const { threadTitle } = useContext(ThreadContentContext);

  let { flair } = useContext(ThreadContentContext);
  const bodyTextHTML = parseMarkdownText(text);
  if (!flair) {
    flair = {
      text: "Text post",
      backgroundColor: theme.palette.primary.main,
      textColor: "light",
    };
  }
  if (text) {
    return (
      <Accordion className="SelfPostWrapper">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            <FlairBox />
            <span className="threadTitle">{threadTitle}</span>
          </div>
        </AccordionSummary>

        <AccordionDetails>{bodyTextHTML}</AccordionDetails>
      </Accordion>
    );
  } else {
    return <ThreadTitle className="SelfPostWrapper" />;
  }
}
export default SelfPostWrapper;
