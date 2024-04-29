import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import parseMarkdownText from "../../../functions/parseMarkdownText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlairBox from "../FlairBox";
import ThreadTitle from "../ThreadTitle";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";

function SelfPostWrapper({ text }) {
  const data = useContext(ThreadContentContext);

  const bodyTextHTML = parseMarkdownText(text);

  if (text) {
    return (
      <Accordion className="SelfPostWrapper" elevation={5}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${data.id}-content`}
          id={`${data.id}-header`}
        >
          <div>
            {(data.link_flair_text || data.link_flair_richtext) && <FlairBox />}
          

            <span className="threadTitle">{parseMarkdownText(data.title)}</span>
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
