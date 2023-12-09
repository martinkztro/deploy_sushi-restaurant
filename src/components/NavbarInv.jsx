import React, { useState } from 'react';
import AgregarModal from './CrearProducto';

export default function NavbarInv({section}) {
  const [agregarModalOpen, setAgregarModalOpen] = useState(false);

  const openAgregarModal = () => {
    setAgregarModalOpen(true);
  };

  const closeAgregarModal = () => {
    setAgregarModalOpen(false);
  };

  return (
    <nav className='flex justify-around items-center mt-8 md:flex-row flex-col'>
      <div>
        <h1 className='text-white font-bold text-4xl'>{section}</h1>
      </div>

      <button
        onClick={openAgregarModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Agregar Producto
      </button>

      
      <AgregarModal isOpen={agregarModalOpen} onClose={closeAgregarModal} />
    </nav>
  );
}