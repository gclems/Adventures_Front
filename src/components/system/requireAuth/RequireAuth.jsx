import { Navigate, useLocation } from "react-router-dom";
import { useSanctum } from "react-sanctum";

function RequireAuth({ children }) {
  const { authenticated } = useSanctum();
  const location = useLocation();

  return authenticated ? (
    children
  ) : (
    <Navigate
      to={`/login?redirectTo=${encodeURI(location.pathname)}`}
      state={{ from: location }}
      replace
    />
  );
}

export default RequireAuth;
