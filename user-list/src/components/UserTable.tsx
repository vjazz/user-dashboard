import React, { useCallback, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { type User } from "../types/User";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const userHearders = ["User", "Email", "Company", "Phone", "City"];

const UserTable: React.FC<UserTableProps> = React.memo(
  ({ users, onUserClick }) => {
    const [usersRendered, setUsersRendered] = React.useState<User[]>([]);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // only display 3 users initially for performance can take longer lists but for demo keeping it simple
      setUsersRendered(users.slice(0, 3));
      // reset scroll to top when users change
      elRef.current?.scrollTo(0, 0);
    }, [users]);

    // implementing simple infinite scroll for user list till all users are rendered
    const handleOnScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (
          usersRendered.length < users.length &&
          scrollTop + clientHeight >= scrollHeight - 5
        ) {
          // Load more users when scrolled to bottom
          setUsersRendered(users.slice(0, usersRendered.length + 3));
        }
      },
      [users, usersRendered.length]
    );

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{ maxHeight: 250 }}
          onScroll={handleOnScroll}
          ref={elRef}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {userHearders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersRendered.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => onUserClick(user)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.company.name}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
);

export default UserTable;
