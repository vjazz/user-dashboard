import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import { type User } from "../types/User";

interface UserProfileProps {
  user: User;
  onEdit: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#1976d2",
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Chip label={`@${user.username}`} size="small" color="primary" />
          </Box>
        </Box>
        <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit}>
          Edit Profile
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📞 Contact Information
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LanguageIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Website
                    </Typography>
                    <Typography variant="body2">{user.website}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Address */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📍 Address
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  mt: 2,
                }}
              >
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="body2">
                    {user.address.street}, {user.address.suite}
                  </Typography>
                  <Typography variant="body2">
                    {user.address.city}, {user.address.zipcode}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Company */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <BusinessIcon color="primary" />
                Company Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  {user.company.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {user.company.catchPhrase}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  {user.company.bs}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
