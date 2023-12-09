import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardHome({
    name,
    comidas,
    description,
    conxt,
    index = 1,
    ruta,
}) {
    const cardColors = ["bg-red-500", "bg-green-500", "bg-yellow-500"];
    const cardIndex = index;
    const cardColorClass = cardColors[cardIndex % cardColors.length];
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`${ruta}`)}
            className={`${cardColorClass} shadow-md cursor-pointer rounded-2xl mx-4 p-8`}
        >
            <div className="flex items-center justify-center flex-col">
                <img
                    src={comidas}
                    alt="Sushi de Pollo"
                    className="w-full max-h-60 object-cover rounded-2xl"
                />
                <div className=" mt-2 text-center">
                    <h2 style={{ fontSize: "3.0rem" }} className="font-black">
                        {name}
                    </h2>
                    <div className="lg:flex flex-col items-center mt-2">
                        <h3
                            style={{ fontSize: "4.8rem" }}
                            className="text-md text-black font-black"
                        >
                            {conxt}
                        </h3>
                        <h3
                            style={{ fontSize: "1.2rem" }}
                            className="text-md text-black font-normal uppercase"
                        >
                            {description}
                        </h3>
                    </div>
                    <figure className="flex justify-center relative top-6 animate-bounce transition-all duration-700">
                        <svg
                            className="w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="black"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.707 16.707a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L10 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                            />
                        </svg>

                    </figure>
                </div>
            </div>
        </div>
    );
}
