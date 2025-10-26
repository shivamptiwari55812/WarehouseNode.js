import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- add this
import "../../cssfiles/AdminPanelLogin.css";

const AdminPanelLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin check
    if (email === "admin@warehouse.com" && password === "admin123") {
      alert("Login successful! Redirecting to admin dashboard...");
      navigate("/admin-panel"); // now this works
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="icon-circle">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
            alt="warehouse icon"
            className="warehouse-icon"
          />
        </div>

        <h2 className="admin-title">Warehouse Admin</h2>
        <p className="admin-subtitle">
          Enter your credentials to access the admin panel
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@warehouse.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelLogin;
