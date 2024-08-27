import { Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack
      sx={{
        position: "fixed",
        height: 60,
        width: "100%",
        bgcolor: "greenyellow",
        boxShadow: "1px 4px 6px rgba(0,0,0,0.2)",
        zIndex: 100,
      }}
    >
      <Typography
        variant="h3"
        component={"h4"}
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
        color={"primary"}
      >
        NOTES APP
      </Typography>
    </Stack>
  );
};
