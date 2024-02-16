import { Box, Typography } from "@mui/material";

type props = {
  py: number;
  position: "absolute" | "relative" | "fixed";
  bottom: string;
};

const Footer: React.FC<Partial<props>> = ({
  py = 2,
  position = "absolute",
  bottom = "20px",
}): JSX.Element => {
  return (
    <Box
      sx={{
        py: py,
        position: position,
        bottom: bottom,
        textAlign: "center",
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography align="center" variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} composer music
      </Typography>
    </Box>
  );
};

export default Footer;
