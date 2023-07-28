import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  };

  const addOrder = () => {
    axios.post('/api/orders', { name: newOrder })
      .then(response => {
        setOrders([...orders, response.data]);
        setNewOrder('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Order Tracker</h1>
      <div>
        <input
          type="text"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
          placeholder="Enter order name"
        />
        <button onClick={addOrder}>Add Order</button>
      </div>
      <div>
        <h2>Orders:</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id}>{order.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
