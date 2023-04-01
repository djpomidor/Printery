import React from 'react'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import avatar from '../../assets/avatar_saul.jpg';

const UserMenu = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="dropdown">
    <a className="d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
        <div>
            <div className="avatar avatar-sm bg-warning rounded-circle text-white">
              <img alt="..."src={ avatar } />
            </div>
        </div>
        <div className="d-none d-sm-block ms-3"><span className="h6">{user.username}</span></div>
        <div className="d-none d-md-block ms-md-2"><i className="bi bi-chevron-down text-muted text-xs"></i></div>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
        <div className="dropdown-header"><span className="d-block text-sm text-muted mb-1">Signed in as</span> <span className="d-block text-heading font-semibold">{user.username}</span></div>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#"><i className="bi bi-house me-3"></i>Home </a><a className="dropdown-item" href="#"><i className="bi bi-pencil me-3"></i>Edit profile</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#"><i className="bi bi-gear me-3"></i>Settings </a><a className="dropdown-item" href="#"><i className="bi bi-image me-3"></i>Media </a>
        <a className="dropdown-item" href="#"><i className="bi bi-box-arrow-up me-3"></i>Share</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="" onClick={logoutUser}>
          <i className="bi bi-person me-3"></i>Logout</a>
    </div>
</div>
  )
}

export default UserMenu