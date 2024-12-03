import React, { useState } from 'react'
import RightPanel from '../rightpanel/RightPanel'
import GetOrders from '../../components/orders/GetOrders'
import { AuthProvider } from "../../context/AuthContext";
import Header from './Header'
import OrdersFrame from './OrdersFrame';

const Main = ({title}) => {
  const [currentComponent, setCurrentComponent] = useState("OrdersTable");
  return (
    <>
    <main className="py-6 bg-surface-secondary">
    <Header setComponent={setCurrentComponent} />
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 table-responsive">
        <div className="card">
        <div className="card-header border-bottom">
          {currentComponent==="OrdersTable"?
          <h5 className="mb-0">Latest Orders</h5>
          :
          <h5 className="mb-0">Создать заказ</h5>}
        </div>
          <OrdersFrame currentComponent={currentComponent} />
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