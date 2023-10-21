import React from "react";
import GetOrders from '../../components/orders/GetOrders'
import CreateOrder from '../../components/orders/CreateOrder'
import { AuthProvider } from "../../context/AuthContext";

const OrdersFrame = ({ currentComponent }) => {
    switch (currentComponent) {
        case "OrdersTable":
          return (
          <div id="orders" className="p-5 table-responsive">
          <AuthProvider>
            <GetOrders />
          </AuthProvider>
          </div>)
        case "CreateOrder":
          return (
          <div className="p-5 mb-3">
            <AuthProvider>
            <CreateOrder />
          </AuthProvider>
          </div>)
        default:
          return null;
      }
}

export default OrdersFrame