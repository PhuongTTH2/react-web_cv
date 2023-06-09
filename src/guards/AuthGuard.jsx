import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { pathName } from "constants/index";
import { isEmpty } from "lodash";
import { STORAGE_KEY } from "constants/index";
/**
 * Only access if logged in.
 * Redirect to login page if not logged in by default.
 */
export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    (() => {
      if (!isEmpty(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN))) {
        setIsAuthenticated(true);
      } else {
        navigate(pathName.FORBIDDEN);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};
