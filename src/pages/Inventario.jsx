import React from "react";
import Layout from "../layouts/Layout";
import NavbarInv from "../components/NavbarInv";
import AgregarModal from "../components/CrearProducto";
import Swal from "sweetalert2";
import useFetch from "../hooks/useFetch";
import deleteData from "../hooks/DeleteButton";
import { useState, useEffect } from "react";

export default function Inventario() {
  
    const [productos, setProductos] = useState([]);

    const [measureUnitOption, setMeasureUnitOption] = useState('Gramos'); 
    const [measureUnitCant, setMeasureUnitCant] = useState('Gramos');
    const [measureUnitMin, setMeasureUnitMin] = useState('Gramos');

    useEffect(() => {
        fetchData();
    }, []); 
    
    const fetchData = async () => {
        try {
            const fetchedData = await useFetch("inventarios");

        const hasKilograms = fetchedData.some((producto) => producto.unidad_medida === 'Kilogramos');
        const hasLitros = fetchedData.some((producto) => producto.unidad_medida === 'Litros');
        const hasGramos = fetchedData.some((producto) => producto.unidad_medida === 'Gramos');

        if (hasKilograms) setMeasureUnitOption('Kilogramos');
        else if (hasLitros) setMeasureUnitOption('Litros');
        else if (hasGramos) setMeasureUnitOption('Gramos');

        setMeasureUnitCant(hasGramos ? 'Gramos' : 'Kilogramos');
        setMeasureUnitMin(hasGramos ? 'Gramos' : 'Kilogramos');
    
            processAndSetData(fetchedData);
        } catch (error) {
            console.error(error);
        }
    };
    
    const processAndSetData = (data) => {
        // Remove trailing 0s
        const modifiedData = data.map(producto => ({
            ...producto,
            cantidad: parseFloat(producto.cantidad),
            cantidad_minima: parseFloat(producto.cantidad_minima),
        }));
    
        // Set modified data to state
        setProductos(modifiedData);
    
        // CONVERSIONS
        // Turn g to kg in cantidad
        if (modifiedData.some((producto) => producto.unidad_medida === 'Gramos' && producto.cantidad >= 1000)) {
            setMeasureUnitOption('Kilogramos');
        }
        // Turn g to kg in cantidad min
        if (modifiedData.some((producto) => producto.unidad_medida === 'Gramos' && producto.cantidad_minima >= 1000)) {
            setMeasureUnitOption('Kilogramos');
        }
        // Turn kg to g in cantidad
        if (modifiedData.some((producto) => producto.unidad_medida === 'Kilogramos' && producto.cantidad < 1)) {
            setMeasureUnitOption('Gramos');
        }
        // Turn kg to g in cantidad min
        if (modifiedData.some((producto) => producto.unidad_medida === 'Kilogramos' && producto.cantidad_minima < 1)) {
            setMeasureUnitOption('Gramos');
        }
    
        // Print modified data
        console.log("Modified data after trim:", modifiedData);
    };
    
    const deleteProducto = async (id) => {
        try {
            await deleteData("inventarios", id);
            // Re-fetch data after deletion
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    

    let showCantidadRes, showCantidadMinRes;
    // Unit conversion functions
    const showCantidad = (producto) => {
        switch (true) {
            // g to kg
            case producto.unidad_medida === 'Gramos' && producto.cantidad >= 1000:
                return `${(producto.cantidad / 1000)} Kilogramos`;
            // kg to g
            case producto.unidad_medida === 'Kilogramos' && producto.cantidad < 1:
                if (measureUnitOption !== 'Gramos') {
                    setMeasureUnitOption('Gramos');
                }
                return `${producto.cantidad * 1000} Gramos`;
            default:
                return `${producto.cantidad} ${producto.unidad_medida}`;
        }
    };

    const showCantidadMin = (producto) => {
        switch (true) {
            // g to kg
            case producto.unidad_medida === 'Gramos' && producto.cantidad_minima >= 1000:
                return `${(producto.cantidad_minima / 1000)} Kilogramos`;
            // kg to g
            case producto.unidad_medida === 'Kilogramos' && producto.cantidad_minima < 1:
                if (measureUnitOption !== 'Gramos') {
                    setMeasureUnitOption('Gramos');
                }
                return `${producto.cantidad_minima * 1000} Gramos`;
            default:
                return `${producto.cantidad_minima} ${producto.unidad_medida}`;
        }
    };
    
    return (
        <Layout>
            <div className="overflow-y-scroll">
                <NavbarInv
                    section="Módulo de Inventario"
                    addBtn="Agregar producto"
                />
                <main className="h-screen mt-3 grid grid-cols-1 md:flex md:flex-wrap md:justify-center  -mb-28">
                    <div className="relative overflow-x-auto mt-20">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Producto
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Cantidad
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Tipo
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Cantidad mínima
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Estado
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
                                { productos.map((producto, id) => (
                                <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div className="flex items-center">
                                            {producto.nombre}
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {showCantidad(producto)}
                                    </td>
                                    <td className="px-6 py-4">{producto.tipo}</td>
                                    <td className="px-6 py-4">
                                    {showCantidadMin(producto)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            producto.cantidad * (measureUnitCant === 'Kilogramos' ? 1000 : 1) <=
                                            producto.cantidad_minima * (measureUnitMin === 'Kilogramos' ? 1000 : 1) ? (
                                                <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
                                                    Agotado
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                    Disponible
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td className="px-6 py-4">
                                    <button
                                                className="rounded-md font-bold border hover:bg-yellow-700 border-yellow-700 bg-yellow-500 text-white py-1 px-3 mr-2"
                                                onClick={() => {
                                                    window.location.href = `/producto/${producto.id}`;
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
                                                            deleteProducto(producto.id);
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
