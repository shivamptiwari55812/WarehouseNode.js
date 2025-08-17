import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../cssfiles/header.css"

export function Header1(){
 
  
const navigate = useNavigate();

localStorage.getItem("token")

function logout (){
  if(localStorage.getItem("token") != null){
    localStorage.removeItem("token")
  }
  navigate("/Login")
}
const locateOrder=()=>{
  navigate("/orderManagement")
}
const locateInventory=()=>{
  navigate("/InventoryManagement")
}
const locateToDashboard= ()=>{
  navigate("/Dashboard")
}
    return(
        <>
        <nav>

          <div id="header-nav" style={{position:"fixed",width:"100%",zIndex:"1",top:"0",left:"0"}}>
    <div className="dashboard-header-bar">
      <div className="header-left">
        <span className="logo">TG</span>
        <span className="company-name"><span className="highlight">TOTAL</span> GROUP</span>
      </div>
      <div className="header-right">
        <span className="admin-name">Administrator</span>
        <button className="logout-button" onClick={logout} >
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>
    </div>
    {/* <!-- Navbar Row with Overview and Navbar --> */}
    <div className="navbar-row">
      <span className="dashboard-overview-title">Dashboard Overview</span>
      <div className="navbar">
          <div className="dropdown">
            <button className="dropbtn" onClick={locateOrder} onDoubleClick={locateToDashboard}>Orders 
              
            </button>
            
          </div>
        
          <div className="dropdown">
            <button className="dropbtn" onDoubleClick={locateToDashboard}>Shipments 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="Status.html">Status</a>
              <a href="Delivery.html">Delivery</a>
            </div>
          </div>
        
          <div className="dropdown">
            <button className="dropbtn" onDoubleClick={locateToDashboard} onClick={locateInventory}>Inventory 
              
            </button>
            
          </div> 
          <div className="dropdown">
            <button className="dropbtn">Warehouse 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="Layout.html">Layout</a>
            </div>
          </div> 
          <div className="dropdown">
            <button className="dropbtn">Reports 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="annualRep.html">Annual</a>
              <a href="Bills.html">Bills</a>
            </div>
          </div>
      </div>  
    </div>
</div>  
        </nav>
        
        </>
    )
}