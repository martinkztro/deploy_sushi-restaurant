import React, {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../layouts/Layout";
import NavbarClient from "../components/NavbarClient";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const endpoint = "http://localhost:8000/api/clientes/";

const EditarCliente = ({}) => {

    // States
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState(0);
    const [correo, setCorreo] = useState("");
    const { id: clienteId } = useParams();
    const navigate = useNavigate();

    // Validation
    const [isNombreValid, setIsNombreValid] = useState(false);
    const [isTelefonoValid, setIsTelefonoValid] = useState(false);
    const [isCorreoValid, setIsCorreoValid] = useState(false);
    const [isSubmitValid, setIsSubmitValid] = useState(false);
    const [isConsoleError, setIsConsoleError] = useState(false);

    //List of regex
    const RegexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;
    const RegexPhone = /^[1-9]+[0-9]*$/;
    const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Functions
	function onSetNombre(value) {
        setNombre(value);   
    }
    useEffect(() => {
        setIsNombreValid(RegexName.test(nombre) && nombre.length > 2);
    }, [nombre]);

    function onSetTelefono(value) {
        setTelefono(value);
    }
    useEffect(() => {
        setIsTelefonoValid(RegexPhone.test(telefono) && telefono.length === 10);   
    }, [telefono]);

    function onSetCorreo(value) {
        setCorreo(value);
    }
    useEffect(() => {
        setIsCorreoValid(RegexEmail.test(correo) && correo.length > 0);   
    }, [correo]);

    // Submit form btn
    useEffect(() => {
        setIsSubmitValid(
            isNombreValid && isTelefonoValid && isCorreoValid
        );
    }, [isNombreValid, isTelefonoValid, isCorreoValid]);


    // Axios
    const update = async (e) => {
        e.preventDefault();
    try{
        await axios.put(`${endpoint}${clienteId}`, { nombre: nombre, telefono: telefono, email: correo });
        navigate("/clientes");
    } catch (error) {
        setIsConsoleError(true);
        console.error("Error:", error);
    }
}

    useEffect(() => {
        const getClient = async () => {
            const response = await axios.get(`${endpoint}${clienteId}`);
            setNombre(response.data.data.nombre);
            setTelefono(response.data.data.telefono);
            setCorreo(response.data.data.email);
        };
        getClient();
    } ,[clienteId]);


    return (
        <Layout>
             <NavbarClient
                    section="Modulo de clientes"
                    addBtn="Agregar producto"
                />
          <div className="fixed inset-0 z-50 overflow-y-scroll bg-black bg-opacity-50 flex">
             <div className="relative p-8 rounded-2xl bg-white w-full max-w-md m-auto flex-col flex">
                 <button
                     className="absolute font-semibold text-xl top-0 right-1 p-4 text-black"
                     onClick={() => navigate("/clientes")}
                 >
                     X
                 </button>
                 <div>
                     <h2 className="text-center mb-5">Editar Cliente</h2>
                     <form onSubmit={update}>
                         <label
                             htmlFor="nombre"
                             className="block mb-2 text-sm font-medium text-gray-900"
                         >
                             Nombre:
                         </label>
                         <input
                             value={nombre}
                             onChange={(e) => onSetNombre(e.target.value)}
                             type="text"
                             id="nombre"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                             placeholder="Ingresar nombre"
                             required
                         />
                         {isNombreValid ? null : (
                        <div className="text-red-500 text-sm mt-1 mb-2">
                            Ingrese nombre mayor a 2 caracteres y sin números o símbolos, sólo letras, acentos y guiones.
                            </div>
                            )}
                        {/*PHONE*/}
                         <label
                             htmlFor="telefono"
                             className="block mb-2 text-sm font-medium text-gray-900"
                         >
                             Teléfono:
                         </label>
                         <input
                             value={telefono}
                             onChange={(e) => onSetTelefono(e.target.value)}
                             type="number"
                             id="telefono"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                             placeholder="Ingresar teléfono (10 dígitos)"
                             required
                         />
                         {isTelefonoValid  ? null : (
                        <div className="text-red-500 text-sm mt-1 mb-2">
                            Ingrese teléfono válido (10 dígitos)
                            </div>
                            )}
                         {/*EMAIL*/}
                         <label
                             htmlFor="email"
                             className="block mb-2 text-sm font-medium text-gray-900"
                         >
                             Correo Electrónico:
                         </label>
                         <input
                             value={correo}
                             onChange={(e) => onSetCorreo(e.target.value)}
                             type="text"
                             id="email"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                             placeholder="Ingresar correo"
                             required
                         />
                         {isCorreoValid ? null : (
                        <div className="text-red-500 text-sm mt-1 mb-2">
                            Ingrese correo válido
                            </div>
                            )} 
                         <div className="flex justify-center mt-4">
                             <button
                                 type="button"
                                 className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mr-2"
                                 onClick={() => navigate("/clientes")}
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
                         {!isConsoleError ? null : (
                            <div className="text-red-500 text-xs mt-3 mb-2">
                                ERROR: Compruebe que los datos sean correctos y que teléfono y correos no esten repetidos.
                            </div>
                        )}
                     </form>
                 </div>
             </div>
         </div>
        </Layout>
     );
};

export default EditarCliente;
