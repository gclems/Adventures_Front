import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import ErrorFallback from "~/components/system/errorFallback/ErrorFallback";

function PublicLayout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-2xl border-2 border-zinc-400 bg-gradient-to-br from-zinc-500 to-zinc-600 p-8  shadow">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default PublicLayout;
