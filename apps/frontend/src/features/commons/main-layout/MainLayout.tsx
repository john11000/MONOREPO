import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <Box sx={{ minHeight: "100vh", padding: "0 10px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}
      ></Box>
      <Box>{children}</Box>
    </Box>
  );
}
