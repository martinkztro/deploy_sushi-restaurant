import React from "react";
import CrearClienteForm from './CrearClienteForm'; 

const CrearCliente = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
            <div className="relative p-8 rounded-2xl bg-white w-full max-w-md m-auto flex-col flex">
                <button
                    className="absolute font-semibold text-xl top-0 right-1 p-4 text-black"
                    onClick={onClose}
                >
                    X
                </button>
                <CrearClienteForm onClose={onClose} />
            </div>
        </div>
    );
};

export default CrearCliente;
