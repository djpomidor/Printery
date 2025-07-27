To achieve your goal, you can use React state and event handling to build a tab-based UI that fetches and displays the relevant data upon clicking each tab. Here is an outline of how you can construct your React component:

1. Create a state for the selected tab and also for the fetched data.
2. Fetch data with `useEffect()` on component mount and whenever the selected tab changes.
3. Display the fetched data in a table.

Here is a sample code snippet to give you an idea of how to implement the above steps:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderTable() {
  const [selectedTab, setSelectedTab] = useState('sm1');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/orders/?machine=${selectedTab}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <div>
        <button onClick={() => setSelectedTab('sm1')}>SM1</button>
        <button onClick={() => setSelectedTab('sm2')}>SM2</button>
        <button onClick={() => setSelectedTab('rapida')}>Rapida</button>
      </div>
      <table>
        <thead>
          {/* Table header goes here */}
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              {/* Render order details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
```

In this example, `selectedTab` state is initialized with `'sm1'`, and `orders` state is initialized with an empty array to store fetched order data.

Inside the `useEffect()` hook, we define an asynchronous function `fetchData()` that fetches orders based on the selected tab through an API. The data fetching process uses the `axios` library. Modify your `/api/orders/` endpoint to handle the filter by machine type (sm1, sm2, rapida). Note that this useEffect hook has `selectedTab` as a dependency, so the specified function will run whenever `selectedTab` changes.

Finally, we render the buttons and table. Each button has an onClick event handler that updates the selected tab when clicked, causing the useEffect hook to refetch order data based on the new tab. The fetched order data is displayed in a table, which you can modify according to the specific details you want to display.

That's it! Your React component should now behave as expected, displaying different data depending on which tab is selected.