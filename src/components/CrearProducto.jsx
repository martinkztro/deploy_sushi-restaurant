import React from 'react';
import CrearProductoForm from './CrearProductoForm.jsx';

const ModalInv = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex">
        <button className="absolute top-0 right-0 p-4" onClick={onClose}>
          <span className="text-xl">×</span>
        </button>
        <CrearProductoForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalInv;
