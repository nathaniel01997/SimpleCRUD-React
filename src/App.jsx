import React, { useState, useEffect } from 'react';
import AddForm from './Component/AddForm';
import UpdateForm from './Component/UpdateForm';
import DeleteForm from './Component/DeleteForm';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleAdd = (item) => {
    const existingItemIndex = items.findIndex(
      (existingItem) => existingItem.name === item.name && existingItem.item === item.item
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].price = parseFloat(updatedItems[existingItemIndex].price) + parseFloat(item.price);
      setItems(updatedItems);
    } else {
      setItems([...items, item]);
    }
    setShowAddForm(false);
  };


  const handleAddClick = () => {
    setShowAddForm(true);
    setShowUpdateForm(false);
  };

  const handleUpdateClick = (item) => {
    setCurrentItem(item);
    setShowUpdateForm(true);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedItem) => {
    const currentIndex = items.findIndex(
      (item) => item.name === currentItem.name && item.item === currentItem.item
    );
    const updatedItems = [...items];
    updatedItems[currentIndex] = updatedItem;
    setItems(updatedItems);
    setShowUpdateForm(false);
  };

  const handleDelete = () => {
    const updatedItems = [...items];
    updatedItems.splice(0, 1);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <header>
        <h1>Item Management System</h1>
      </header>
      <nav className="navbar">
        <ul>
          <li><a className={showAddForm ? '' : 'active'} onClick={handleAddClick} href="#">Add</a></li>
          <li><a className={showUpdateForm ? 'active' : ''} href="#">Update</a></li>
          <li><a href="#">Delete</a></li>
          <li><a href="#">Refresh</a></li>
        </ul>
      </nav>
      {showAddForm && <AddForm onAdd={handleAdd} />}
      {showUpdateForm && <UpdateForm onUpdate={handleUpdate} currentItem={currentItem} />}
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td><button onClick={() => handleUpdateClick(item)}>Update</button></td>
              <td><DeleteForm onDelete={handleDelete} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;