import React, { useState } from 'react'
import RightPanel from '../rightpanel/RightPanel'
import GetOrders from '../../components/orders/GetOrders'
import { AuthProvider } from "../../context/AuthContext";

import Header from './Header';

const Main = () => {
  return (
    <>
    <main className="py-6 bg-surface-secondary">
    <Header />
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 table-responsive">

        {/* // <!-- Latest orders table --> */}
        <div className="card">
        <div className="card-header border-bottom"><h5 className="mb-0">Latest orders</h5></div>
          <div id="orders" className="table-responsive">
          <AuthProvider>
            <GetOrders />
            </AuthProvider>
          </div>
        </div>
        </div>
        <RightPanel />
      </div>
    </div>
    </main>
    </>
  )
}

export default Main