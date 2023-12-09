import React from "react";
import Layout from "../layouts/Layout";
import NavbarClient from "../components/NavbarClient";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import deleteData from "../hooks/DeleteButton";
import Swal from "sweetalert2";

export default function Clientes() {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        useFetch("clientes").then((clientesData) => setClientes(clientesData));
    }, []);

    const deleteCliente = async (id) => {
        try {
            await deleteData("clientes", id);
            const clientesData = await useFetch("clientes");
            
            setClientes(clientesData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="overflow-y-scroll">
                <NavbarClient
                    section="Módulo de Clientes"
                    addBtn="Agregar producto"
                />
                <main className="h-screen mt-3 grid grid-cols-1 md:flex md:flex-wrap md:justify-center  -mb-28">
                    <div className="relative overflow-x-auto mt-20">
                        <table className="-z-50 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Nombre
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Teléfono
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Correo Electrónico
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Fecha
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr
                                        key={cliente.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {cliente.nombre}
                                        </th>
                                        <td className="px-6 py-4">
                                            {cliente.telefono}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cliente.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cliente.created_at}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="rounded-md font-bold border hover:bg-yellow-700 border-yellow-700 bg-yellow-500 text-white py-1 px-3 mr-2"
                                                onClick={() => {
                                                    window.location.href = `/cliente/${cliente.id}`;
                                                }
                                                }
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="rounded-md font-bold border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mr-2"
                                                onClick={() =>
                                                    Swal.fire({
                                                        title:
                                                            "¿Estás seguro?",
                                                        text:
                                                            "No podrás revertir esto",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor:
                                                            "#3085d6",
                                                        cancelButtonColor:
                                                            "#d33",
                                                        confirmButtonText:
                                                            "Sí, eliminar",
                                                        cancelButtonText:
                                                            "Cancelar",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            deleteCliente(cliente.id);
                                                            Swal.fire(
                                                                "Eliminado",
                                                                "El registro ha sido eliminado",
                                                                "success"
                                                            );
                                                        }
                                                    })
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
