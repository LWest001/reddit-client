import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "../FlairBox";
import ThreadTitle from "../ThreadTitle";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";
import { getFlair } from "../../../functions/getFlair";

function SelfPostWrapper({ text }) {
  const data = useContext(ThreadContentContext);
  let flair = getFlair(data);
  const bodyTextHTML = parseMarkdownText(text);
  if (!flair) {
    flair = {
      text: "Text post",
      backgroundColor: "primary.main",
      textColor: "light",
    };
  }
  if (text) {
    return (
      <Accordion className="SelfPostWrapper">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${data.id}-content`}
          id={`${data.id}-header`}
        >
          <div>
            <FlairBox />
            <span className="threadTitle">{data.title}</span>
          </div>
        </AccordionSummary>

        <AccordionDetails
          id={`${data.id}-content`}
          sx={{
            ">p": {
              mb: 2,
            },
            ">p:last-of-type": {
              marginBottom: "0",
            },
          }}
        >
          {bodyTextHTML}
        </AccordionDetails>
      </Accordion>
    );
  } else {
    return <ThreadTitle className="SelfPostWrapper" />;
  }
}
export default SelfPostWrapper;
