import { getAuthToken, removeAuthToken } from "./api";

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function signOut(): void {
  removeAuthToken();
  window.location.href = "/";
}
