import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import ErrorFallback from "~/components/system/errorFallback/ErrorFallback";

function PrivateLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  );
}

export default PrivateLayout;
