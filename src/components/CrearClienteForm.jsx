import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const endpoint = "http://localhost:8000/api/clientes";

const CrearClienteForm = ({ onSubmit, onClose }) => {

    // States
    const [name, setName] = useState("");
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState("");

    //  Validation  
    const [isNameValid, setIsNameValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isContactInfoValid, setIsContactInfoValid] = useState(false);
    const [isSubmitValid, setIsSubmitValid] = useState(false);

    // Focus check
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    //List of regex
    const RegexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;
    const RegexPhone = /^[1-9]+[0-9]*$/;
    const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // Functions
	function onSetName(value) {
        setName(value);   
    }
    useEffect(() => {
        setIsNameValid(RegexName.test(name) && name.length > 2);
    }, [name]);

    function onSetPhone(value) {
        setPhone(value);
    }
    useEffect(() => {
        setIsPhoneValid(RegexPhone.test(phone) && phone.length === 10);   
    }, [phone]);

    function onSetEmail(value) {
        setEmail(value);
    }
    useEffect(() => {
        setIsEmailValid(RegexEmail.test(email) && email.length > 0);   
    }, [email]);

    // Contact info validation
    useEffect(() => {
        setIsContactInfoValid(
            isNameValid && isPhoneValid && isEmailValid
        );
    }, [isNameValid, isPhoneValid, isEmailValid]);


    // Submit form btn
    useEffect(() => {
        setIsSubmitValid(
            isNameValid && isPhoneValid && isEmailValid
        );
    }, [isNameValid, isPhoneValid, isEmailValid]);


    // Axios
    const create = async (e) => {
        e.preventDefault();

        console.log("Sending data:", { nombre: name, telefono: phone, email: email });

    try{
        await axios.post(endpoint, { nombre: name, telefono: phone, email: email });
        onClose();
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);

        // alert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifique que la entrada sea única y los datos sean correctos.',
        });
    }
}

return (
    <div>
        <h2 className="text-center mb-5">Crear Cliente</h2>
        <form onSubmit={create}>
        {/*NAME*/}
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Nombre:
            </label>
            <input
                value={name}
                onChange={(e) => onSetName(e.target.value)}
                onFocus={() => setIsNameFocused(true)}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                placeholder="Ingresar nombre"
                required
            />
            {isNameValid ? null : (
            <div className="text-red-500 text-sm mt-1 mb-2">
                Ingrese nombre mayor a 2 caracteres y sin números o símbolos, sólo letras, acentos y guiones.
                </div>
                )}
            {/*PHONE*/}
            <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Teléfono:
            </label>
            <input
                value={phone}
                onChange={(e) => onSetPhone(e.target.value)}
                onFocus={() => setIsPhoneFocused(true)}
                type="number"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                placeholder="Ingresar teléfono (10 dígitos)"
                required
            />
            {isPhoneValid  ? null : (
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
                value={email}
                onChange={(e) => onSetEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ingresar correo"
                required
            />
            {isEmailValid ? null : (
            <div className="text-red-500 text-sm mt-1 mb-2">
                Ingrese correo válido
                </div>
                )} 

            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 mr-2"
                    onClick={onClose} // onClose para cerrar modal?
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
        </form>
        </div>
);
};

export default CrearClienteForm;
