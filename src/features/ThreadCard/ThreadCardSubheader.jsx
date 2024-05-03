import { Stack } from "@mui/material";
import AuthorChip from "../../components/Chips/AuthorChip";

function ThreadCardSubheader({ author, timestamp }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }} mt={1}>
      <AuthorChip author={author} />
    </Stack>
  );
}

export default ThreadCardSubheader;
