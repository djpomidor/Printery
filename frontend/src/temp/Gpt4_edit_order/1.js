//    как в React реализовать:
//    Есть список состоящий из нескольких div, 
//    каждый div состоит из номера заказа и имени заказа и кнопки редактирования, 
//    при нажатии на которую вместо этого div должна появляться форма редактирования, 
//    в которой можно изменить только название заказа
//    и отправить данные формы на сервер через API.
//    
//    Для реализации данной функциональности в React вам понадобится следующий компонентный подход:
//    
//    1. Создайте компонент OrderList, который будет хранить список заказов и управлять их отображением. 
//        В этом компоненте вы можете использовать состояние для отслеживания текущего редактируемого заказа.

import React, { useState } from 'react';

const OrderList = () => {
  const [editingOrder, setEditingOrder] = useState(null);

  const orders = [
    { id: 1, name: 'Order 1' },
    { id: 2, name: 'Order 2' },
    { id: 3, name: 'Order 3' }
  ];

  const handleEditOrder = (orderId) => {
    setEditingOrder(orderId);
  };

  const handleSaveOrder = (orderId, newName) => {
    // Здесь вы можете отправить данные на сервер через API
    console.log(`Saved changes for order ${orderId}: ${newName}`);

    setEditingOrder(null);
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {editingOrder === order.id ? (
            <EditForm order={order} onSave={handleSaveOrder} />
          ) : (
            <OrderItem order={order} onEdit={handleEditOrder} />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;


// 2. Создайте компонент OrderItem, который будет отображать информацию о заказе и кнопку редактирования.

import React from 'react';

const OrderItem = ({ order, onEdit }) => {

  return (
    <div>
      <span>{order.name}</span>
      <button onClick={() => onEdit(order.id)}>Edit</button>
    </div>
  );
};

export default OrderItem;


// 3. Создайте компонент EditForm, который будет содержать форму редактирования для заказа.

import React, { useState } from 'react';

const EditForm = ({ order, onSave }) => {
  const [newName, setNewName] = useState('');

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

export default EditForm;


// 4. Добавьте необходимую логику в компоненты для обновления состояния и отправки данных на сервер через API. 
// В данном примере данные сохраняются локально и выводятся в консоль для демонстрации.
// Теперь вы можете использовать компонент OrderList в своем приложении для управления списком заказов и их редактированием.