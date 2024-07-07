import createStore, { useStore } from "@/components/store";
import { UserDTO } from "./user-dto";

const USER_KEY = "user";

const user: UserDTO | null = JSON.parse(
  localStorage.getItem(USER_KEY) ?? "null"
);

const loggedInUserStore = createStore<UserDTO | null>(user);

export function useUserStore() {
  return useStore(loggedInUserStore);
}

export function setLoggedInUser(user: UserDTO) {
  loggedInUserStore.set(user);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
