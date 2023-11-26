import { useState } from "react";

import { useCustomEventListener } from "react-custom-events";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSanctum } from "react-sanctum";

import ErrorFallback from "~/components/system/errorFallback/ErrorFallback";
import RequireAuth from "~/components/system/requireAuth/RequireAuth";
import useMount from "~/hooks/useMount";
import AdventurePage from "~/pages/adventure/AdventurePage";
import AdventuresListPage from "~/pages/adventuresList/AdventuresListPage";
import LoginPage from "~/pages/login/LoginPage";
import PrivateLayout from "~/pages/PrivateLayout";
import PublicLayout from "~/pages/PublicLayout";

import LoadingOverlay from "./components/html/loadingOverlay/LoadingOverlay";

const publicRoutes = [
  {
    path: "login",
    element: LoginPage,
  },
];
const privateRoutes = [
  {
    path: "*",
    element: AdventuresListPage,
  },
  {
    path: "adventures/:id",
    element: AdventurePage,
  },
];

function App() {
  const [initialized, setInitialize] = useState(false);
  const { checkAuthentication, signOut } = useSanctum();

  useCustomEventListener("loginExpired", () => {
    signOut();
  });

  useMount(() => {
    const init = async () => {
      await checkAuthentication();
      setInitialize(true);
    };

    init();
  });

  if (!initialized) {
    return <div>Initialization</div>;
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              {publicRoutes.map((r, i) => (
                <Route key={`public_${i}`} {...r} element={<r.element />} />
              ))}
            </Route>

            <Route element={<PrivateLayout />}>
              {privateRoutes.map((r, i) => (
                <Route
                  key={`private_${i}`}
                  {...r}
                  element={
                    <RequireAuth>
                      <r.element />
                    </RequireAuth>
                  }
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <LoadingOverlay />
    </>
  );
}

export default App;
