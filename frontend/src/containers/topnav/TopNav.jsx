import React from 'react'
import Search from '../../components/search/Search'
import Notifications from '../../components/notifications/Notifications'
import UserMenu from '../../components/usermenu/UserMenu'
const TopNav = (props) => {
  return (
    <nav className="sticky-top navbar navbar-light top-lg-0 d-none d-lg-block flex-none bg-white border-bottom px-0 py-3" id="topbar"> 
      <div className="container-fluid">
        <h1>{props.header}</h1>
         <div className='ms-auto me-4 d-none d-md-flex'>
          
         </div>
         {/* <Search /> */}
         
        {/*<div className="navbar-user d-none d-sm-block">
        <div className="hstack gap-3 ms-4"> */}
        <Notifications />
        <UserMenu />

        {/* </div>
        </div> */}
      </div>
    </nav>
  )
}

export default TopNav