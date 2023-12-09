import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalPlatillo = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientQuantities, setIngredientQuantities] = useState({});
    const [listaDeIngredientes, setListaDeIngredientes] = useState([]);
    const [nuevoElemento, setNuevoElemento] = useState(""); // Agregado
    const [cantidad, setCantidad] = useState(1);
    const [ordenItems, setOrdenItems] = useState([]);
    const [platillos, setPlatillos] = useState([]);

    // Validation
    const [isNameValid, setIsNameValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [isPriceValid, setIsPriceValid] = useState(false);
    const [isImageValid, setIsImageValid] = useState(false);
    const [isSelectedIngredientsValid, setIsSelectedIngredientsValid] =
        useState(false);
    const [isIngredientQuantitiesValid, setIsIngredientQuantitiesValid] =
        useState(false);
    const [isListaDeIngredientesValid, setIsListaDeIngredientesValid] =
        useState(false);
    const [isSubmitValid, setIsSubmitValid] = useState(false);

    //List of regex
    const RegexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;

    // Functions
    // name
    function onSetName(value) {
        setName(value);
    }
    useEffect(() => {
        setIsNameValid(
            RegexName.test(name) && name.length > 2 && name.length < 50
        );
    }, [name]);

    // description
    function onSetDescription(value) {
        setDescription(value);
    }
    useEffect(() => {
        setIsDescriptionValid(
            description.length > 10 && description.length < 100
        );
    }, [description]);

    // price
    function onSetPrice(value) {
        setPrice(value);
    }
    useEffect(() => {
        setIsPriceValid(price > 0);
    }, [price]);

    // selectedingredients
    function onSetSelectedIngredients(value) {
        setSelectedIngredients(value);
    }
    useEffect(() => {
        setIsSelectedIngredientsValid(selectedIngredients.length > 0);
    }, [selectedIngredients]);

    // ingredientquantities
    function onSetIngredientsQuantities(value) {
        setIngredientQuantities(value);
    }
    useEffect(() => {
        const hasValidQuantities = Object.values(ingredientQuantities).some(
            (quantity) => quantity > 0
        );
        setIsIngredientQuantitiesValid(hasValidQuantities);
    }, [ingredientQuantities]);

    // Submit form btn
    useEffect(() => {
        setIsSubmitValid(
            isNameValid &&
                isDescriptionValid &&
                isPriceValid
        );
    }, [
        isNameValid,
        isDescriptionValid,
        isPriceValid
    ]);

    const handleQuantityChange = (ingredientId, quantity) => {
        setIngredientQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ingredientId]: quantity,
        }));
    };

    const handleAgregarPlatillo = () => {
        if (listaDeIngredientes.length > 0 && cantidad > 0 && nuevoElemento !== "") {
            const ingredienteSeleccionado = listaDeIngredientes.find(
                (ingrediente) => ingrediente.id === parseInt(nuevoElemento, 10)
            );
    
            if (ingredienteSeleccionado) {
                const nuevoItem = {
                    listaDeIngredientes: ingredienteSeleccionado,
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


    useEffect(() => {
        axios.get("http://localhost:8000/api/inventarios").then((response) => {
            setListaDeIngredientes(response.data.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("imagen_path", image);
        formData.append("nombre", name);
        formData.append("descripcion", description);
        formData.append("precio", price);
    
        try {
            // Primera solicitud para crear el platillo
            const response1 = await axios.post("http://localhost:8000/api/platillos", formData);
    
            // Obtener el ID del platillo recién creado
            const idPlatillo = response1.data.id;
    
            // Segunda solicitud para asociar el platillo con los ingredientes
            const formData2 = new FormData();
            formData2.append("ingredientes", JSON.stringify(ingredientesSeleccionados));
    
            await axios.post(`http://localhost:8000/api/platillosInventarios/${idPlatillo}`, formData2);
    
            // Cerrar el modal o realizar otras acciones necesarias
            onClose();
        } catch (error) {
            console.error("Error:", error);
    
            // alert
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Verifique que la entrada sea única y los datos sean correctos.",
            });
        }
    };
    
    
    
    
    
    

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
            <form
                onSubmit={handleSubmit}
                className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex"
            >
                <button
                    className="absolute top-0 right-0 p-4"
                    onClick={onClose}
                >
                    <span className="text-xl">×</span>
                </button>
                <div>
                    <h2 className="text-center mb-5">Crear Platillo</h2>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nombre del platillo
                        </label>
                        <input
                            value={name}
                            onChange={(e) => onSetName(e.target.value)}
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                            placeholder="Ingresar"
                            required
                        />
                        {isNameValid ? null : (
                            <div className="text-red-500 text-sm mt-1 mb-2">
                                Ingrese nombre de 3-50 caracteres y sin números
                                o símbolos, sólo letras, acentos y guiones.
                            </div>
                        )}
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Precio
                        </label>
                        <input
                            value={price}
                            onChange={(e) => onSetPrice(e.target.value)}
                            type="number"
                            id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                            placeholder="Ingresar precio"
                            required
                        />
                        {isPriceValid ? null : (
                            <div className="text-red-500 text-sm mt-1 mb-2">
                                Ingrese número positivo.
                            </div>
                        )}
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Descripción
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => onSetDescription(e.target.value)}
                            type="text"
                            id="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                            placeholder="Ingrese una breve descripcion del platillo"
                            required
                        />
                        {isDescriptionValid ? null : (
                            <div className="text-red-500 text-sm mt-1 mb-2">
                                Ingrese descripción de 10-100 caracteres.
                            </div>
                        )}

                        <div className="p-8">
                            <label htmlFor="platillos">
                                Seleccione sus Ingredientes
                            </label>
                            <select
                                id="platillos"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                onChange={(e) =>
                                    setNuevoElemento(e.target.value)
                                }
                                value={nuevoElemento}
                            >
                                <option className="text-black" value="">
                                    Seleccionar
                                </option>
                                {listaDeIngredientes.map((platillo) => (
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
                                <h3 className="font-bold"> - Ingredientes Seleccionados: - </h3>
                                <ul>
                                    {ordenItems.map((item, index) => (
                                        <li key={index}>
                                            {item.listaDeIngredientes.nombre} -
                                            Cantidad: {item.cantidad}
                                            <button
                                                type="button"
                                                className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mt-2 ml-2"
                                                onClick={() =>
                                                    handleEliminarPlatillo(
                                                        index
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <label
                            htmlFor="imagen"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Imagen
                        </label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            name="imagen_path"
                            id="imagen"
                            accept="image/png, image/jpeg"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                        />
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
                                className={
                                    isSubmitValid
                                        ? "btn rounded-md border hover:bg-green-700 border-green-700 bg-green-500 text-white py-1 px-3 ml-2"
                                        : "btn rounded-md border hover:bg-gray-700 border-gray-700 bg-gray-500 text-white py-1 px-3 ml-2"
                                }
                                disabled={!isSubmitValid}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModalPlatillo;
