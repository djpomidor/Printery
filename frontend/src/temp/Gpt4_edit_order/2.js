//    как в React реализовать:
//    Есть список состоящий из нескольких div, 
//    каждый div состоит из номера заказа и имени заказа и кнопки редактирования, 
//    при нажатии на которую вместо этого div должна появляться форма редактирования, 
//    в которой можно изменить только название заказа
//    и отправить данные формы на сервер через API.
//    после обновления данных на место формы должна вернутся строка с заказом и с обновленными данными.
//    
//    ///////////////////////////////
//    
//    Для реализации этой функциональности в React вам понадобится использовать состояние для отслеживания текущего редактируемого заказа и управления отображением содержимого. Ниже приведен пример компонентов, которые могут помочь вам решить задачу:

import React, { useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1' },
    { id: 2, name: 'Order 2' },
    { id: 3, name: 'Order 3' }
  ]);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const handleEditOrder = (orderId) => {
    setEditingOrderId(orderId);
  };

  const handleSaveOrder = (orderId, newName) => {
    // Simulated API call to update order data
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, name: newName };
      }
      return order;
    });

    setOrders(updatedOrders);
    setEditingOrderId(null);
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {editingOrderId === order.id ? (
            <EditForm order={order} onSave={handleSaveOrder} />
          ) : (
            <OrderItem order={order} onEdit={handleEditOrder} />
          )}
        </div>
      ))}
    </div>
  );
};

const OrderItem = ({ order, onEdit }) => {
  return (
    <div>
      <span>Order {order.id}: {order.name}</span>
      <button onClick={() => onEdit(order.id)}>Edit</button>
    </div>
  );
};

const EditForm = ({ order, onSave }) => {
  const [newName, setNewName] = useState(order.name);

  const handleSave = () => {
    onSave(order.id, newName);
  };

  return (
    <div>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default OrderList;


// В этом примере компонент OrderList содержит список заказов, а также функции для изменения состояний, обновления данных заказов и управления отображением формы редактирования. Когда вы нажимаете кнопку "Edit" у заказа, отображается форма редактирования с возможностью изменения имени заказа и отправки обновленных данных на сервер. После сохранения данных форма заменяется на обновленную информацию о заказе.