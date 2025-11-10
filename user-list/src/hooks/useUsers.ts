import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { type User } from "../types/User";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
