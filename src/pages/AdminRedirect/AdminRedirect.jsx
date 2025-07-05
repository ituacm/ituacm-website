import React, { useEffect } from "react";
import { checkAuth } from "../../api/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { adminNavigator } from "../../utils/utils";

function AdminRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    adminNavigator(navigate);
  }, []);

  return <Outlet />;
}

export default AdminRedirect;
