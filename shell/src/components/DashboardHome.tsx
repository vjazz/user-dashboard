import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the User Dashboard
      </Typography>
      <Typography variant="body1" align="center">
        This dashboard allows you to manage and view user information. Click the
        below card to access the user list and view detailed information about
        each user.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Card
          sx={{ maxWidth: 345, textAlign: "center", pt: 1.5 }}
          onClick={() => navigate("/users")}
        >
          <CardActionArea>
            <GroupIcon fontSize="large" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User Management
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                manage and view user information
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Paper>
  );
};

export default DashboardHome;
