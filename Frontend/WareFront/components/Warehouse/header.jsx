import { useState } from 'react'
import "../../cssfiles/header.css"

export function Header1(){
    return(
        <>

        <nav>

          <div id="header-nav">
    <div className="dashboard-header-bar">
      <div className="header-left">
        <span className="logo">TG</span>
        <span className="company-name"><span className="highlight">TOTAL</span> GROUP</span>
      </div>
      <div className="header-right">
        <span className="admin-name">Administrator</span>
        <button className="logout-button" onClick="location.href='logout.html'">
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>
    </div>
    {/* <!-- Navbar Row with Overview and Navbar --> */}
    <div className="navbar-row">
      <span className="dashboard-overview-title">Dashboard Overview</span>
      <div className="navbar">
          <div className="dropdown">
            <button className="dropbtn">Orders 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="orderOut2Page.html">Inbound</a>
              <a href="orderplacement.html">Outbound</a>
            </div>
          </div>
        
          <div className="dropdown">
            <button className="dropbtn">Shipments 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="Status.html">Status</a>
              <a href="Delivery.html">Delivery</a>
            </div>
          </div>
        
          <div className="dropdown">
            <button className="dropbtn">Inventory 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="tableforInv.html">Edit</a>
              <a href="addProduct.html">Add Product</a>
              <a href="statusInv.html">Alert!</a>
            </div>
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