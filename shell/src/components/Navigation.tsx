import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Link, Typography, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 1.5,
        backgroundColor: "#fafafa",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          color="inherit"
          onClick={() => navigate("/")}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Home
        </Link>

        {pathSegments[0] === "users" && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            color={pathSegments.length === 1 ? "text.primary" : "inherit"}
            onClick={() => navigate("/users")}
          >
            <PeopleIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Users
          </Link>
        )}

        {pathSegments.length === 2 && pathSegments[0] === "users" && (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <PersonIcon sx={{ mr: 0.5, fontSize: 20 }} />
            User Details
          </Typography>
        )}
      </Breadcrumbs>
    </Paper>
  );
};

export default Navigation;
