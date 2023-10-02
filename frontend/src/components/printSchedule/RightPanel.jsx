import React from 'react'
import GetFilteredOrders from './GetFilteredOrders'

const RightPanel = () => {
  return (
    <div className="col-lg-4">
    <div className="card position-sticky top-32">
      <div className="card-body pb-0">
        <h6 className="mb-4">Orders</h6>
        <GetFilteredOrders/>
          <hr className="mt-4 mb-0" />

      </div>
      </div>
  </div>
  )
}

export default RightPanel