import React from "react";
import { useNavigate } from "react-router-dom";
import "../../cssfiles/WarehousePage.css";

const WarehousePage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/adminPanel-login");
  };

  return (
    <div className="warehouse-container">
      <div className="icon-circle">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
          alt="warehouse icon"
          className="warehouse-icon"
        />
      </div>

      <h1 className="warehouse-title">Warehouse Management</h1>
      <p className="warehouse-description">
        Complete admin panel for managing your warehouse operations efficiently
      </p>

      <button className="admin-button" onClick={handleAdminClick}>
        Go to Admin Panel <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default WarehousePage;
