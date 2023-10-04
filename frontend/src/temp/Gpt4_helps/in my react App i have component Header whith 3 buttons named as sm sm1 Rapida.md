in my react App i have component "Header" whith 3 buttons named as "sm", "sm1", "Rapida". And under another component which shows the table of orders. When user click the button, second component must show the orders which are coresponding to boolen value of fields "sm", "sm1", "Rapida" 

To achieve this functionality, you should use state and props to manage communication between the two components. Here's a step-by-step approach to achieve this:

1. In your main `App` component, create a state to hold the selected order type (e.g., "sm", "sm1", or "Rapida") and another state to hold the order data.

```jsx
import React, { useState } from 'react';
import Header from './Header';
import OrderTable from './OrderTable';

function App() {
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [orders, setOrders] = useState([]);

  return (
    <div>
      <Header setSelectedOrderType={setSelectedOrderType} />
      <OrderTable orders={orders} selectedOrderType={selectedOrderType} />
    </div>
  );
}

export default App;
```

2. In your `Header` component, create a function to handle button clicks. Pass this function to each button and update the selected order type using the `setSelectedOrderType` prop.

```jsx
import React from 'react';

function Header({ setSelectedOrderType }) {
  const handleButtonClick = (orderType) => {
    setSelectedOrderType(orderType);
  };

  return (
    <header>
      <button onClick={() => handleButtonClick('sm')}>SM</button>
      <button onClick={() => handleButtonClick('sm1')}>SM1</button>
      <button onClick={() => handleButtonClick('Rapida')}>Rapida</button>
    </header>
  );
}

export default Header;
```

3. In your `OrderTable` component, use the `selectedOrderType` prop to filter the displayed orders based on the corresponding boolean value. You can achieve this using the `useEffect` hook, which will trigger each time the `selectedOrderType` prop changes.

```jsx
import React, { useEffect, useState } from 'react';

function OrderTable({ orders, selectedOrderType }) {
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (selectedOrderType) {
      const filtered = orders.filter((order) => order[selectedOrderType] === true);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [selectedOrderType, orders]);

  return (
    <table>
      // render table headers
      <tbody>
        {filteredOrders.map((order) => (
          // render each order as a table row
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
```

Now, when a user clicks a button in the `Header` component, the `OrderTable` will display only the orders where the selected field's value is `true`.