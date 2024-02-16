import React from "react";

// Material ui core

// Material ui icons
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";

interface Props {
  tooltip: string;
  onClick(): void;
}
const CustomToolbar = ({ tooltip, onClick }: Props) => {
  return (
    <Tooltip title={tooltip} onClick={onClick}>
      <Fab size="small" color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};
export default CustomToolbar;
