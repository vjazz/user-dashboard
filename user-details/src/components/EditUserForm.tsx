import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Alert } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { type User } from "../types/User";

interface EditUserFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<User>(user);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[\d\s\-\(\)x.+]+$/.test(phone);
  };

  const handleChange = (field: string, value: string) => {
    const keys = field.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [field]: value });
    } else if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...(formData[keys[0] as keyof User] as any),
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...(formData[keys[0] as keyof User] as any),
          [keys[1]]: {
            ...(formData[keys[0] as keyof User] as any)[keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        ✏️ Edit User Profile
      </Typography>

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please fix the errors below
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Basic Information */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Website"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </Grid>

        {/* Address */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Street"
            value={formData.address.street}
            onChange={(e) => handleChange("address.street", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Suite"
            value={formData.address.suite}
            onChange={(e) => handleChange("address.suite", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="City"
            value={formData.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Zipcode"
            value={formData.address.zipcode}
            onChange={(e) => handleChange("address.zipcode", e.target.value)}
          />
        </Grid>

        {/* Company */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Company Name"
            value={formData.company.name}
            onChange={(e) => handleChange("company.name", e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Catch Phrase"
            value={formData.company.catchPhrase}
            onChange={(e) =>
              handleChange("company.catchPhrase", e.target.value)
            }
          />
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} type="submit">
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserForm;
