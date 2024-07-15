import axios from "axios";

const BASE_URL = "http://localhost:3000";

const base_api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

async function waitForSeconds(seconds = 2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export async function get_default(url: string) {
  // await waitForSeconds();
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
