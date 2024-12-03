import React from "react";
import GetOrders from '../../components/orders/GetOrders'
import CreateOrder from '../../components/orders/createOrder/CreateOrder'
import { AuthProvider } from "../../context/AuthContext";
import XmlToJsonParser from '../../components/orders/createOrder/XmlToJsonParser.jsx';

const OrdersFrame = ({ currentComponent }) => {
    switch (currentComponent) {
      case "XmlToJsonParser":
        return (
        <div className="p-5 mb-3">
          <AuthProvider>
          <XmlToJsonParser />
        </AuthProvider>
        </div>)
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