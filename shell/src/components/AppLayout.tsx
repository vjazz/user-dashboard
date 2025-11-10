import React, { type ReactNode } from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Navigation from "./Navigation";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Navigation />

      <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: "auto",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} User Dashboard. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout;
