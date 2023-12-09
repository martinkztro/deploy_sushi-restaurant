import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CrearOrden = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [platillos, setPlatillos] = useState([]);
  const [tipoOrden, setTipoOrden] = useState("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ordenItems, setOrdenItems] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [nuevoElemento, setNuevoElemento] = useState(""); // Agregado

  const endpoint = "http://localhost:8000/api/platillos";

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setPlatillos(response.data.data);
      })
      .catch((error) => {
        console.log("Salió error:", error);
      });
  }, []);

  const handleAgregarPlatillo = () => {
    if (platillos.length > 0 && cantidad > 0 && nuevoElemento !== "") {
      const platilloSeleccionado = platillos.find(
        (platillo) => platillo.id === parseInt(nuevoElemento, 10)
      );

      if (platilloSeleccionado) {
        const nuevoItem = {
          platillo: platilloSeleccionado,
          cantidad: cantidad,
        };

        setOrdenItems([...ordenItems, nuevoItem]);
        setNuevoElemento("");
        setCantidad(1);
      }
    }
  };

  const handleEliminarPlatillo = (index) => {
    const nuevaOrden = [...ordenItems];
    nuevaOrden.splice(index, 1);
    setOrdenItems(nuevaOrden);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Realizar la solicitud POST para crear una nueva orden
      const response = await axios.post("http://localhost:8000/api/ordenes", {
        tipo_orden: tipoOrden,
        mesa: numeroMesa,
        direccion: direccion,
        platillos: ordenItems,
      });
  
      // Manejar la respuesta del servidor
      if (response.status === 201) {
        console.log("Orden creada con éxito:", response.data);
        
        // Cerrar el modal (puedes agregar lógica adicional aquí)
        onClose();
        
        // Restablecer el estado del componente
        setTipoOrden("");
        setNumeroMesa("");
        setDireccion("");
        setOrdenItems([]);
        setCantidad(1);
        setNuevoElemento("");
      } else {
        console.log("Error al crear la orden:", response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear la orden",
      });
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex">
        <button className="absolute top-0 right-0 p-4" onClick={onClose}>
          <span className="text-xl">×</span>
        </button>
        <div>
          <h2 className="text-center mb-5">Orden</h2>
          <div>
            <label htmlFor="platillos">Seleccione sus platillos</label>
            <select
              id="platillos"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => setNuevoElemento(e.target.value)}
              value={nuevoElemento}
            >
              <option className="text-black" value="">
                Seleccionar
              </option>
              {platillos.map((platillo) => (
                <option
                  key={platillo.id}
                  className="text-black"
                  value={platillo.id}
                >
                  {platillo.nombre}
                </option>
              ))}
            </select>

            <label htmlFor="cantidad">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <button
              type="button"
              onClick={handleAgregarPlatillo}
              className="btn rounded-md border hover:bg-green-700 border-green-700 bg-green-500 text-white py-1 px-3 mt-2 ml-2"
            >
              Agregar
            </button>

            <div>
            <h3 className="font-bold"> - Platillos Seleccionados: - </h3>
              <ul>
                {ordenItems.map((item, index) => (
                  <li key={index}>
                    {item.platillo.nombre} - Cantidad: {item.cantidad}
                    <button
                      type="button"
                      className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mt-2 ml-2"
                      onClick={() => handleEliminarPlatillo(index)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <label htmlFor="tipoOrden">Tipo de Orden</label>
            <select
              id="tipoOrden"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => setTipoOrden(e.target.value)}
            >
              <option className="text-black" value="">
                Seleccionar
              </option>
              <option className="text-black" value="domicilio">
                Domicilio
              </option>
              <option className="text-black" value="restaurante">
                Restaurante
              </option>
            </select>

            {tipoOrden === "restaurante" && (
              <div>
                <label htmlFor="numeroMesa">Número de Mesa</label>
                <input
                  type="number"
                  id="numeroMesa"
                  min="1"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            )}

            {tipoOrden === "domicilio" && (
              <div>
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn rounded-md border hover:bg-green-700 border-green-700 bg-green-500 text-white py-1 px-3 ml-2"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearOrden;
