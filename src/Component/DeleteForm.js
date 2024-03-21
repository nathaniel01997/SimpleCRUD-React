import React from 'react';

const DeleteForm = ({ onDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteForm;