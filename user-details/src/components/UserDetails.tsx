import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserProfile from "./UserProfile";
import EditUserForm from "./EditUserForm";
import { useUserEdit } from "../hooks/useUserEdit";
import { userService } from "../services/userService";
import { type User } from "../types/User";
import { useUserId } from "../hooks/useUserId";

const UserDetails: React.FC = () => {
  const id = useUserId();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { saveUser, getSavedUser } = useUserEdit();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Check localStorage first
        const savedUser = getSavedUser(parseInt(id));
        if (savedUser) {
          setUser(savedUser);
        } else {
          // Fetch from API
          const data = await userService.getUserById(parseInt(id));
          setUser(data);
        }
      } catch (err) {
        setError("Failed to load user details.");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, getSavedUser]);

  const handleSave = (updatedUser: User) => {
    saveUser(updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
    setShowSuccess(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || "User not found"}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/users")}
          sx={{ mt: 2 }}
        >
          Back to Users
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/users")}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Back to Users
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        {isEditing ? (
          <EditUserForm
            user={user}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <UserProfile user={user} onEdit={() => setIsEditing(true)} />
        )}
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message="✅ User updated successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
};

export default UserDetails;
