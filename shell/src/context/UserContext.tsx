import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type User } from "../types/User";

interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const updateUser = useCallback(
    (updatedUser: User) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      if (selectedUser?.id === updatedUser.id) {
        setSelectedUser(updatedUser);
      }
    },
    [selectedUser]
  );

  const value: UserContextType = {
    selectedUser,
    setSelectedUser,
    users,
    setUsers,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
