import React, { useState } from "react";

const OrdersTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.number.includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по номеру"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Описание</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.number}</td>
              <td>{order.description}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
