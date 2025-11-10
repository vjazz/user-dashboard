import { useCallback } from "react";
import { type User } from "../types/User";

const STORAGE_KEY = "edited_users";

export const useUserEdit = () => {
  const saveUser = useCallback((user: User) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const users = saved ? JSON.parse(saved) : {};
      users[user.id] = user;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, []);

  const getSavedUser = useCallback((userId: number): User | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const users = JSON.parse(saved);
      return users[userId] || null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }, []);

  return { saveUser, getSavedUser };
};
