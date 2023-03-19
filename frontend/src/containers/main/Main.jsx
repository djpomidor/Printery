import React, { useState } from 'react'
import RightPanel from '../rightpanel/RightPanel'
import GetOrders from '../../components/orders/GetOrders'

const Main = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 table-responsive">

        {/* // <!-- Latest orders table --> */}
        <div className="card">
        <div className="card-header border-bottom"><h5 className="mb-0">Latest orders</h5></div>
          <div id="orders" className="table-responsive">
            <GetOrders />
          </div>
        </div>
        </div>
        <RightPanel />
      </div>
    </div>
  )
}

export default Main