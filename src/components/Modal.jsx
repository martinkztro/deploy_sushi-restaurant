import React from 'react';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Nuevo Elemento:', nuevoElemento);
        onClose(); 
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex">
                <button className="absolute top-0 right-0 p-4" onClick={onClose}>
                    <span className="text-xl">×</span>
                </button>
                <div>
                    <h2 className='text-center mb-5'>Orden</h2>
                    <div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Selecciona el platillo</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500">
                           
                            <option className='text-black' selected="">Seleccionar</option>
                            <option className='text-black' value="TV">Gohan klip</option>
                            <option className='text-black' value="PC">California roll</option>
                            <option className='text-black' value="GA">Tempura roll</option>
                            <option className='text-black' value="PH">Mar y Tierra roll</option>
                        </select>
                    </div>

                        <div className="col-span-2 sm:col-span-1">
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Tipo de orden</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option className='text-black' selected="">Seleccionar</option>
                            <option className='text-black' value="RS">Restaurante</option>
                            <option className='text-black' value="DM">Servicio a domicilio</option>
                            
                        </select>
                    </div>

                        <label htmlFor="nuevoElemento" className="block mb-2 text-sm font-medium text-gray-900">
                           Numero de mesa
                        </label>
                        <input
                            type="text"
                            id="nuevoElemento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Ingresar"
                            required
                        />

                        <label htmlFor="nuevoElemento" className="block mb-2 text-sm font-medium text-gray-900">
                            Domicilio
                        </label>
                        <input
                            type="text"
                            id="nuevoElemento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Ingresar"
                            required
                        />
                        
                        <div className="flex justify-center mt-4">
              <button
                type="button"
                className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mr-2"
                onClick={onClose} // Puedes cambiar esto a onClose si este botón también debe cerrar la modal
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn rounded-md border hover:bg-green-700 border-green-700 bg-green-500 text-white py-1 px-3 ml-2"
              >
                Guardar
              </button>
            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;