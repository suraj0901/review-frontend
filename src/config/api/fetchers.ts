import axios from "axios";

const BASE_URL = "http://localhost:3000";

const base_api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export function get_default(url: string) {
  return base_api.get(url);
}
export function delete_default(url: string) {
  return base_api.delete(url);
}
export async function post_default(
  url: string,
  { arg: data }: { arg: unknown }
) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 3000);
  });
  return base_api.post(url, data);
}
export function put_default(url: string, { arg: data }: { arg: unknown }) {
  return base_api.put(url, data);
}
