import { useState } from "react";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME?.trim() ?? "";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim() ?? "";
const STORAGE_KEY = "rng_admin_authed";

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "1",
  );

  function login(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setIsAuthed(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthed(false);
  }

  return { isAuthed, login, logout };
}
