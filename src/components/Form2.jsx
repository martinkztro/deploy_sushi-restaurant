import React from 'react';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom'

const imageUrl = '';

const handleDownload = () => {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    saveAs(imageUrl, fileName);
};

export default function Formulario({ elements, elements2, elements3, elements4, present }) {
    return (
        <div className=" lg: flex justify-center items-center h-screen md: -mt-28 ">
            <form className="flex flex-col justify-center items-center gap-2  max-w-lg text-center" action="index.html">
                <div className="fromGroup">
                    <label className="text-white block capitalize form-label font-bold " style={{ fontSize: '1.5em' }}>{present}</label>
                    <div className="relative">
                        <input
                            type="texto"
                            name="email"
                            className="form-control py-2 text-center lg:min-w-[400px]"
                            placeholder="Ingresar"
                        />
                    </div>
                </div>

                <div className="fromGroup p-5">
                    <label className="text-white block capitalize form-label font-bold " style={{ fontSize: '1.5em' }}>Tipo de orden</label>
                    <div className="relative flex items-center p-5">
                        <div className="flex items-center">
                        <div className="flex items-center">
                            <select name="select">

                                <option value="value2" selected>Restaurante</option>
                                <option value="value3">Domicilio</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="fromGroup">
                    <label className="text-white block capitalize form-label font-bold " style={{ fontSize: '1.5em' }}>{elements}</label>

                    <div className="relative">
                        <input
                            type="text"
                            name="password"
                            className="form-control py-2 text-center lg:min-w-[400px] "
                            placeholder="Ingresar"
                        />
                    </div>
                </div>

                <div className="fromGroup">
                    <label className="text-white block capitalize form-label font-bold " style={{ fontSize: '1.5em' }}>{elements2}</label>

                    <div className="relative">
                        <input
                            type="text"
                            name="password"
                            className="form-control py-2 text-center lg:min-w-[400px]"
                            placeholder="Ingresar"
                        />
                    </div>
                </div>





                <div className='flex gap-4 '>

                    <NavLink to='/ordenes' className="btn rounded-md border hover:bg-red-700 border-red-700 bg-red-500 text-white py-1 px-3 ">Cancelar</NavLink>
                    <button
  className="btn rounded-md border hover:bg-green-700 border-green-700 bg-green-500 text-white py-1 px-3"
>
  Guardar
</button>
                </div>

            </form>
        </div>
    );
}
