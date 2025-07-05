import React, { useEffect, useRef } from "react";
import "./AdminLogin.css";
import { checkAuth, login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { adminNavigator } from "../../utils/utils";

function AdminLogin() {
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    //bunu yapmazsan page resetleniyor.

    await login(usernameRef.current.value, passwordRef.current.value);

    adminNavigator(navigate);
  };

  return (
    <div className="contact-page">
      <h1>Admin Login</h1>

      <form className="contact-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={usernameRef} //Ref'i ekle
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
