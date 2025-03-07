import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuStyles.css";
const headers = { Authorization: localStorage.getItem("Authorization") };

export default function MenuList(){

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5050/menu/list`).then((res) => setMenuItems(res.data));
  }, []);

  const handleQuantityChange = (id, change) => {
    setCart((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const handleSubmitOrder = () => {
    const order = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({ itemId: id, quantity: qty }));
      console.log(order);
      axios.post("http://localhost:5050/order/list", { order }, { headers });
  };

  return(
    <div className="menu-container">
      <h2>Menu Items</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-card">
            <img src={item.image.url} alt={item.item} />
            <h3>{item.item}</h3>
            <p>{item.ingredients}</p>
            <p>Price: ${item.price}</p>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
              <span>{cart[item._id] || 0}</span>
              <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmitOrder}>Submit Order</button>
    </div>
  )
} 