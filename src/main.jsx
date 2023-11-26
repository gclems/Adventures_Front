import React from "react";

import axios from "axios";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Sanctum } from "react-sanctum";

import App from "./App.jsx";
import { ProvideLoader } from "./hooks/useLoader.jsx";

import "./assets/fontawesome/css/all.min.css";
import "./theme.css";
import "../node_modules/rpg-awesome/css/rpg-awesome.min.css";

axios.defaults.withXSRFToken = true;

const sanctumConfig = {
  apiUrl: import.meta.env.VITE_API_ENDPOINT,
  csrfCookieRoute: "csrf-cookie",
  signInRoute: "login",
  signOutRoute: "logout",
  userObjectRoute: "user",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProvideLoader>
      <Sanctum config={sanctumConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Sanctum>
    </ProvideLoader>
  </React.StrictMode>,
);
