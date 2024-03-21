import React, { useState } from 'react';

const UpdateForm = ({ onUpdate, currentItem }) => {
  const [name, setName] = useState(currentItem.name);
  const [item, setItem] = useState(currentItem.item);
  const [price, setPrice] = useState(currentItem.price);

  const handleNameChange = (e) => {
    if (!/\d/.test(e.target.value)) {
      setName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...currentItem, name, item, price });
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;