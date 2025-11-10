import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import { theme } from "./theme";
import { UserProvider } from "./context/UserContext";
import AppLayout from "./components/AppLayout";
import DashboardHome from "./components/DashboardHome";
import ErrorBoundary from "./components/ErrorBoundary";

const UserListMF = lazy(() => import("userList/Module"));
const UserDetailsMF = lazy(() => import("userDetails/Module"));

const LoadingFallback: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="60vh"
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <BrowserRouter>
            <AppLayout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<DashboardHome />} />
                  <Route
                    path="/users"
                    element={
                      <ErrorBoundary>
                        <UserListMF />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/users/:id"
                    element={
                      <ErrorBoundary>
                        <UserDetailsMF />
                      </ErrorBoundary>
                    }
                  />
                  <Route path="*" element={<Navigate to="/users" replace />} />
                </Routes>
              </Suspense>
            </AppLayout>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
