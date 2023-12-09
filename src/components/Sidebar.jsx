import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const [open, setOpen] = useState(false);
    const Menus = [
        { icon: "🏠", title: "Inicio", ruta: '/inicio'  },
        { icon: "🗒️", title: "Ordenes", ruta: '/ordenes' },
        { icon: "🍽️", title: "Platillos", ruta: '/platillos' },
        { icon: "🥕", title: "Inventario", ruta: '/inventario' },
        { icon: "👤", title: "Clientes", ruta: '/clientes'},
       
        { icon: "📤", title: 'Salir', ruta: '/' , gap:true },
    ];

    return (
        <div className="flex">
            <div 
                className={` ${open ? "w-60" : "w-[4.8rem]"
                    } bg-slate-950 h-screen p-5 pt-8 top-0 fixed z-40 duration-300`}
            >
                <a 
                    src="/circulo.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7
                   text-3xl ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                >
                    ⬅️
                </a>
                <div className="flex gap-x-4 items-center">
                    <img
                        src="public/sushi.png"
                        className={`cursor-pointer duration-500 w-5 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-black text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                       Sushi Bar
                       Restaurant
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (

                        <NavLink
                            key={index}
                            to={Menu.ruta}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-600 text-gray-200 text-md items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} 
                                ${index == 0 && "mt-0"}
                            ${Menu.logout
                                    ? "hover:bg-red-700 hover:text-white"
                                    : "hover:bg-slate-600 text-gray-300"
                                }
                            `}
                        >
                            
                            {Menu.icon}
                            <span className={`${!open && "hidden"}`}>
                                
                                {Menu.title}

                            </span>

                            
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;