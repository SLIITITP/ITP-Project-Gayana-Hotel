import React from "react";
import './sidenavbar.css'

function Sidenavbar() {

  return (
<div className='container dashboard'>
    <div className="dashboard-nav ">
        <header>
                <a href="/" className="brand-logo"><i className="fas fa-anchor"></i> <span>Gayana Hotel <br/>DashBorad</span></a>
        </header>
        <nav className="dashboard-nav-list">
            <a href="/" className="dashboard-nav-item"><i className="fas fa-home"></i>Home </a>
            <a href="/" className="dashboard-nav-item"><i className="fas fa-tachometer-alt"></i>Room reservation & booking</a>
            <a href="/" className="dashboard-nav-item"><i className="fas fa-file-upload"></i>Wedding & banquet hall</a>
            <div className='dashboard-nav-dropdown'>
                <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i className="fas fa-photo-video"></i>Transport Management </a>
                <div className='dashboard-nav-dropdown-menu'>
                    <a href="/" className="dashboard-nav-dropdown-item">All</a>
                    <a href="/" className="dashboard-nav-dropdown-item">Recent</a>
                    <a href="/" className="dashboard-nav-dropdown-item">Images</a>
                    <a href="/" className="dashboard-nav-dropdown-item">Video</a></div>
            </div>
            <div className='dashboard-nav-dropdown'><a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i  className="fas fa-users"></i> Billing & Invoice </a>
                <div className='dashboard-nav-dropdown-menu'>
                        <a href="/Payment_Details" className="dashboard-nav-dropdown-item">Payment Details</a>
                         <a href="/CardDetails" className="dashboard-nav-dropdown-item">Card Details</a>
                </div>
            </div>
            <div className='dashboard-nav-dropdown'><a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i  className="fas fa-users"></i> Menu Management </a>
                <div className='dashboard-nav-dropdown-menu'>
                        <a href="/Menu_Details" className="dashboard-nav-dropdown-item">Menu Details</a>
                         <a href="/" className="dashboard-nav-dropdown-item"></a>
                </div>
            </div>
            <div className='dashboard-nav-dropdown'>
                <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i className="fa-solid fa-warehouse"></i> Inventory & Supply </a>
                <div className='dashboard-nav-dropdown-menu'>
                        <a href="/" className="dashboard-nav-dropdown-item">Orders</a>
                        <a href="/item/" className="dashboard-nav-dropdown-item">Items</a>
                        <a href="/category/" className="dashboard-nav-dropdown-item"> Category</a>
                </div>
            </div>
            <a href="/" className="dashboard-nav-item"><i className="fas fa-cogs"></i> Customer Relationship</a>
            <a href="/" className="dashboard-nav-item"><i className="fas fa-user"></i> Employee Management </a>
            <a href="/" className="dashboard-nav-item"><i className="fas fa-user"></i> Profile</a>
          <div className="nav-item-divider"></div>
          <a href="/" className="dashboard-nav-item"><i className="fas fa-sign-out-alt"></i> Logout </a>
        </nav>
    </div>
    <div className='dashboard-app'>
        <header className='dashboard-toolbar fixed-top'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>
        
    </div>
</div>
  );
}

export default Sidenavbar;
