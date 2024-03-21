import React, { useState, useEffect } from 'react';
import './AddForm.css'; 

const AddForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [item, setItem] = useState('Item1');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    if (!isNaN(name)) {
      setError('Name must be a string');
      return;
    }
    onAdd({ name, item, price });
    setName('');
    setItem('Item1');
    setPrice(0);
    setError('');
    setItems([...items, { name, item, price }]);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items'));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select className='items' value={item} onChange={(e) => setItem(e.target.value)}>
          <option value="Item1">Item1</option>
          <option value="Item2">Item2</option>
          <option value="Item3">Item3</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name}, <strong>Item:</strong> {item.item}, <strong>Price:</strong> {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddForm;