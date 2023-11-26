import axios from "axios";
import queryString from "query-string";
import { emitCustomEvent } from "react-custom-events";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 1000,
  withXSRFToken: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 419 && !originalRequest._retry) {
      let refreshError = false;
      await HttpClient.get("csrf-cookie").catch(() => {
        refreshError = true;
      });

      if (!refreshError) {
        originalRequest._retry = true;
        return instance(originalRequest);
      }

      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  },
);

const Http = {
  request: async (method, route, params = null, body = undefined) => {
    let error = null;

    const resp = await instance({
      method,
      url: route,
      data: body,
      params,
      paramsSerializer: function (params) {
        return queryString.stringify(params, { arrayFormat: "bracket" });
      },
    }).catch((e) => {
      error = e;
    });

    if (error) {
      if (error.response?.status === 401) {
        emitCustomEvent("loginExpired");
      }

      return Promise.reject(error);
    }

    switch (resp.status) {
      case 200:
      case 201:
      case 204:
        return Promise.resolve(resp.data);
      default:
        return Promise.reject(resp.data);
    }
  },
};

const HttpClient = {
  get: (route, params = null) => Http.request("get", route, params),
  post: (route, params = null, body = null) =>
    Http.request("post", route, params, body),
  put: (route, params = null, body = null) =>
    Http.request("put", route, params, body),
  patch: (route, params = null, body = null) =>
    Http.request("patch", route, params, body),
  delete: (route, params = null) => Http.request("delete", route, params),
};

export default HttpClient;
