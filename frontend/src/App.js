import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";  // Import the CSS file

function App() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ name: "", description: "" });
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    fetchMenus();
  }, []);

  // Fetch menus from the backend
  const fetchMenus = async () => {
    const response = await axios.get("https://my-app-mfn5.onrender.com/api/menus");
    setMenus(response.data);
  };

  // Handle menu creation
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (newMenu.name.trim() === "") return alert("Menu name is required");

    await axios.post("https://my-app-mfn5.onrender.com/api/menus", newMenu);
    setNewMenu({ name: "", description: "" });
    fetchMenus();
  };

  // Handle selecting a menu
  const handleMenuSelect = (menuId) => {
    const selected = menus.find(menu => menu._id === menuId);
    setSelectedMenu(selected);
  };

  // Handle adding items to the selected menu
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMenu) return alert("No menu selected");
    if (newItem.name.trim() === "" || newItem.price === "") return alert("Item name and price are required");

    await axios.post(`https://my-app-mfn5.onrender.com/api/menus/${selectedMenu._id}/items`, newItem);
    setNewItem({ name: "", description: "", price: "" });
    handleMenuSelect(selectedMenu._id);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header">
        <div className="logo">DEEP NET SOFT</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Menu</span>
          <span>Make a Reservation</span>
          <span>Contact Us</span>
        </div>
      </div>

      {/* Main */}
      <div className="main-section">
        <h1 className="title">MENU</h1>
        <p className="subtitle">
          Please take a look at our menu featuring food, drinks, and brunch.
          If you'd like to place an order, use the "Order Online" button below.
        </p>

        {/* Adding Menu */}
        <form onSubmit={handleMenuSubmit} className="form-container">
          <h3 className="form-title">Add New Menu</h3>
          <input
            type="text"
            placeholder="Menu Name"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Menu Description"
            value={newMenu.description}
            onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button"
          >
            Add Menu
          </button>
        </form>

        {/* Buttons */}
        <div className="menu-buttons">
          {menus.map(menu => (
            <button
              key={menu._id}
              onClick={() => handleMenuSelect(menu._id)}
              className={`menu-button ${
                selectedMenu && selectedMenu._id === menu._id
                  ? "selected"
                  : ""
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>

        {/*Display */}
        {selectedMenu && (
          <div className="menu-items">
            <h2 className="menu-name">{selectedMenu.name}</h2>
            <p>{selectedMenu.description}</p>

            {/* Menu Item adding*/}
            <form onSubmit={handleItemSubmit} className="form-container">
              <h3 className="form-title">Add Item to {selectedMenu.name}</h3>
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
                className="input-field"
              />
              <input
                type="text"
                placeholder="Item Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
                className="input-field"
              />
              <button
                type="submit"
                className="submit-button"
              >
                Add Item
              </button>
            </form>

            {/* Display */}
            <ul className="item-list">
              {selectedMenu.items.map(item => (
                <li key={item._id} className="item">
                  <strong>{item.name}</strong> ....... ${item.price}
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-left">
          <span>© 2024 Deepnetsoft Solutions. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <span>Terms and Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

export default App;
