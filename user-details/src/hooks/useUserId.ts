import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

/**
 * Custom hook to extract a user ID from either:
 * 1. React Router URL params (e.g. /users/:id)
 * 2. Or fallback to the last segment of the current path (/users/details/123)
 */

export const useUserId = (): string | null => {
  const params = useParams<{ id?: string }>();
  const location = useLocation();

  // Memoize to avoid recomputing on every render unless path or params change
  const userId = useMemo(() => {
    if (params.id) return params.id;

    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment || null;
  }, [params.id, location.pathname]);

  return userId;
};
