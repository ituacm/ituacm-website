import axios from "axios";
import { supabase } from "./supabaseClient";

export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    console.log("user is not authenticated.");
    return false;
  }

  console.log("user is authenticated.");
  return true;
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("user login failed:", error.message);
    return false;
  }

  console.log("user logged in.");
  return true;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("user logout failed:", error.message);
    return false;
  }

  console.log("user logged out.");
  return true;
};
