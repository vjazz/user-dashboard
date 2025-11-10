import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import { useUsers } from "../hooks/useUsers";
import { useDebounce } from "../hooks/useDebounce";
import { type User } from "../types/User";

const ITEMS_PER_PAGE = 5;

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 300ms debounce for search input
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { users, loading, error } = useUsers();

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;

    const query = debouncedSearch.toLowerCase();
    return users.filter(
      (user) =>
        // check name, email, username, company name for matches
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
    );
  }, [users, debouncedSearch]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleUserClick = useCallback(
    (user: User) => {
      navigate(`/users/${user.id}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, width: "calc(100vw - 32px)" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          👥 User Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Browse and manage users in the system
        </Typography>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, email, username, or company..."
        />

        <Box sx={{ mt: 3 }}>
          {filteredUsers.length === 0 ? (
            <Alert severity="info">
              No users found matching your search criteria.
            </Alert>
          ) : (
            <>
              <UserTable users={paginatedUsers} onUserClick={handleUserClick} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default UserList;
