import React from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/auth";

export const adminNavigator = async (navigate) => {
  try {
    const isAuth = await checkAuth();
    if (isAuth === true) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  } catch (error) {
    console.error("Navigator Error:", error);
  }
};
