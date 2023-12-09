import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const endpoint = "http://localhost:8000/api/users";
const currentUserEndpoint = "http://localhost:8000/api/user";

function LoginForm() {

    const email = "admin@gmail.com"
    const password = "root12345"

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    useEffect(() => {
        const { email, password } = formData;

        const emailError = validateEmail(email)
            ? ""
            : "Ingrese un correo electrónico válido";
        setErrors({
            email: emailError,
        });

        setIsFormValid(!(emailError) && email && password);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
  
        if (formData.email === email && formData.password === password) {
          const response = await axios.get(currentUserEndpoint);
          const user = response.data.data;
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/inicio";
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Credenciales incorrectas",
            });
            }
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="fromGroup">
                    <label className="block capitalize form-label">
                        Correo electrónico
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            className="form-control py-2"
                            placeholder="Ingresa tu correo electrónico"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>
                <div className="fromGroup">
                    <label className="block capitalize form-label">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            className="form-control py-2"
                            placeholder="Ingresa tu contraseña"
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between"></div>
                <button
                    type="submit"
                    className={`btn ${
                        isFormValid
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } block w-full text-center`}
                    disabled={!isFormValid}
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
