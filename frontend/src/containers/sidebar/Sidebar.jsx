import React, { useState } from 'react';
import avatar from '../../assets/avatar_saul.jpg';
import logo_cmyk from '../../assets/logo-cmyk.png'

const Sidebar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar" id="sidebar">
    <div className="container-fluid">
      <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand d-inline-block py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
        <img alt="..." src={ logo_cmyk } className=''/> 
          <span className="fs-5 fw-semibold">Printery</span></a>
        <div className="navbar-user d-lg-none">
            <div className="dropdown">
                <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar-parent-child">
                      <img alt="..." src={ avatar } className="avatar avatar- rounded-circle" /> 
                      <span className="avatar-child avatar-badge bg-success"></span>
                    </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                    <a href="#" className="dropdown-item">Profile</a> 
                    <a href="#" className="dropdown-item">Settings</a> 
                    <a href="#" className="dropdown-item">Billing</a>
                    <hr className="dropdown-divider" />
                    <a href="{% url 'logout' %}" className="dropdown-item">Logout</a>
                </div>
            </div>
        </div>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#sidebar-orders" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-orders"><i className="bi bi-briefcase"></i>Orders</a>
                    <div className="collapse" id="sidebar-orders">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item"><a href="/pages/orders/overview.html" className="nav-link">Current</a></li>
                            <li className="nav-item"><a href="/pages/orders/grid-view.html" className="nav-link">Finished</a></li>
                            <li className="nav-item"><a href="/create-order" className="nav-link">Create Order</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#sidebar-user" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-user"><i className="bi bi-people"></i> User</a>
                    <div className="collapse" id="sidebar-user">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item"><a href="/pages/user/profile.html" className="nav-link">Profile</a></li>
                            <li className="nav-item"><a href="/pages/user/table-view.html" className="nav-link">Table View</a></li>
                            <li className="nav-item"><a href="/pages/user/permissions.html" className="nav-link">Permissions</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#sidebar-settings" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-settings"><i className="bi bi-gear"></i> Settings</a>
                    <div className="collapse" id="sidebar-settings">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item"><a href="/pages/settings/general.html" className="nav-link">General</a></li>
                            <li className="nav-item"><a href="/pages/settings/security.html" className="nav-link">Security</a></li>
                            <li className="nav-item"><a href="/pages/settings/team.html" className="nav-link">Team</a></li>
                            <li className="nav-item"><a href="/pages/settings/billing.html" className="nav-link">Billing</a></li>
                            <li className="nav-item"><a href="/pages/settings/notifications.html" className="nav-link">Notifications</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <hr className="navbar-divider my-4 opacity-70" />
            <ul className="navbar-nav">
                <li><span className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide">Resources</span></li>
                <li className="nav-item">
                    <a className="nav-link py-2" href="/docs"><i className="bi bi-code-square"></i> Documentation</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link py-2 d-flex align-items-center" href="#" target="_blank">
                        <i className="bi bi-journals"></i> <span>Changelog</span> <span className="badge badge-sm bg-soft-success text-success rounded-pill ms-auto">v1.0.0</span>
                    </a>
                </li>
            </ul>
            <div className="mt-auto"></div>
            <div className="my-4 px-lg-6 position-relative">
                <div className="dropup w-full">
                    <button className="btn-primary d-flex w-full py-3 ps-3 pe-4 align-items-center shadow shadow-3-hover rounded-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="me-3">
                          <img alt="..." src={avatar} className="avatar avatar-sm rounded-circle" /> </span>
                          <span className="flex-fill text-start text-sm font-semibold">username</span>
                        <span><i className="bi bi-chevron-expand text-white text-opacity-70"></i></span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end w-full">
                        <div className="dropdown-header"><span className="d-block text-sm text-muted mb-1">Signed in as</span> <span className="d-block text-heading font-semibold">username</span></div>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#"><i className="bi bi-house me-3"></i>Home </a><a className="dropdown-item" href="#"><i className="bi bi-pencil me-3"></i>Profile </a>
                        <a className="dropdown-item" href="#"><i className="bi bi-gear me-3"></i>Settings</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="{% url 'logout' %}"><i className="bi bi-box-arrow-left me-3"></i>Logout</a>
                    </div>
                </div>
                <div className="d-flex gap-3 justify-content-center align-items-center mt-6 d-none">
                    <div><i className="bi bi-moon-stars me-2 text-warning me-2"></i> <span className="text-heading text-sm font-bold">Dark mode</span></div>
                    <div className="ms-auto">
                        <div className="form-check form-switch me-n2"><input className="form-check-input" type="checkbox" id="switch-dark-mode" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
  )
}

export default Sidebar