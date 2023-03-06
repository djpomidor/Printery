import React from 'react'
import Search from '../../components/search/Search'
import Notifications from '../../components/notifications/Notifications'
import UserMenu from '../../components/usermenu/UserMenu'
const TopNav = () => {
  return (
    <nav className="navbar navbar-light position-lg-sticky top-lg-0 d-none d-lg-block overlap-10 flex-none bg-white border-bottom px-0 py-3" id="topbar">
      <div className="container-fluid">
        <Search />
        <div className="navbar-user d-none d-sm-block">
        <div className="hstack gap-3 ms-4">
        <Notifications />
        <UserMenu />

        </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNav