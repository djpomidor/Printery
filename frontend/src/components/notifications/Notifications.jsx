import React from 'react'
import img_profile from '../../assets/img-profile.jpg'

const Notifications = () => {
  return (
    <div className="dropdown">
    <a href="#" className="nav-link px-3 text-base text-muted text-opacity-70 text-opacity-100-hover ms-auto me-4  d-md-flex" id="dropdown-notifications" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-bell-fill"></i>
    </a>
    <div className="dropdown-menu dropdown-menu-end px-2" aria-labelledby="dropdown-notifications">
        <div className="dropdown-item d-flex align-items-center">
            <h6 className="dropdown-header p-0 m-0 font-semibold">Notifications</h6>
            <a href="#" className="text-sm font-semibold ms-auto">Clear all</a>
        </div>
        <div className="dropdown-item py-3 d-flex">
            <div><div className="avatar bg-tertiary text-white rounded-circle">RF</div></div>
            <div className="flex-fill ms-3">
                <div className="text-sm lg-snug w-64 text-wrap">
                    <a href="#" className="font-semibold text-heading text-primary-hover">Robert</a> sent a message to <a href="#" className="font-semibold text-heading text-primary-hover">Username</a>
                </div>
                <span className="text-muted text-xs">30 mins ago</span>
            </div>
        </div>
        <div className="dropdown-item py-3 d-flex">
            <div><img alt="..." src={img_profile} className="avatar rounded-circle" /></div>
            <div className="flex-fill ms-3">
                <div className="text-sm lg-snug w-64 text-wrap">
                    <a href="#" className="font-semibold text-heading text-primary-hover">Robert</a> sent a message to <a href="#" className="font-semibold text-heading text-primary-hover">Username</a>
                </div>
                <span className="text-muted text-xs">30 mins ago</span>
            </div>
        </div>
        <div className="dropdown-item py-3 d-flex">
            <div><img alt="..." src={img_profile} className="avatar rounded-circle" /></div>
            <div className="flex-fill ms-3">
                <div className="text-sm lg-snug w-64 text-wrap">
                    <a href="#" className="font-semibold text-heading text-primary-hover">Robert</a> sent a message to <a href="#" className="font-semibold text-heading text-primary-hover">Username</a>
                </div>
                <span className="text-muted text-xs">30 mins ago</span>
            </div>
        </div>
        <div className="dropdown-item py-3 d-flex">
            <div><div className="avatar bg-success text-white rounded-circle">KW</div></div>
            <div className="flex-fill ms-3">
                <div className="text-sm lg-snug w-64 text-wrap">
                    <a href="#" className="font-semibold text-heading text-primary-hover">Robert</a> sent a message to <a href="#" className="font-semibold text-heading text-primary-hover">Username</a>
                </div>
                <span className="text-muted text-xs">30 mins ago</span>
            </div>
        </div>
        <div className="dropdown-item py-3 d-flex">
            <div><img alt="..." src={img_profile} className="avatar rounded-circle" /></div>
            <div className="flex-fill ms-3">
                <div className="text-sm lg-snug w-64 text-wrap">
                    <a href="#" className="font-semibold text-heading text-primary-hover">Robert</a> sent a message to <a href="#" className="font-semibold text-heading text-primary-hover">Username</a>
                </div>
                <span className="text-muted text-xs">30 mins ago</span>
            </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="dropdown-item py-2 text-center"><a href="#" className="font-semibold text-muted text-primary-hover">View all</a></div>
    </div>
</div>
  )
}

export default Notifications