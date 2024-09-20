import axios from "axios";
import { REFRESH_TOKEN } from "./endpoint";
import { AUTH_KEY, BEARER } from "../constant/app.config";

const BASE_URL = "http://localhost:3000";

export const base_api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

base_api.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_KEY);
  config.headers.Authorization = `${BEARER} ${token}`;
  return config;
});

base_api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log({ originalRequest });

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await base_api.post(REFRESH_TOKEN, null, {
          withCredentials: true,
        });
        const { token: accessToken } = response.data.token;
        localStorage.setItem(AUTH_KEY, accessToken);
        originalRequest.headers.Authorization = `${BEARER} ${accessToken}`;
        return base_api(originalRequest);
      } catch (error) {
        localStorage.removeItem(AUTH_KEY);
        // window.location.reload();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

async function waitForSeconds(seconds = 2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export async function get_default(url: string) {
  await waitForSeconds();
  return base_api.get(url);
}
export async function delete_default(url: string) {
  await waitForSeconds();
  return base_api.delete(url);
}
export async function post_default(
  url: string,
  { arg: data }: { arg: unknown }
) {
  await waitForSeconds();
  return base_api.post(url, data);
}
export async function put_default(
  url: string,
  { arg: data }: { arg: unknown }
) {
  await waitForSeconds();
  return base_api.put(url, data);
}
export async function put_form(url: string, { arg: data }: { arg: unknown }) {
  await waitForSeconds();
  return base_api.putForm(url, data);
}
