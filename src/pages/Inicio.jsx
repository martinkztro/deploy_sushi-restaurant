import { useState, useEffect } from 'react'
import CardHome from '../components/CardHome'
import Layout from '../layouts/Layout';
import axios from 'axios';

const endpoint = 'https://restaurante-api-production.up.railway.app/api';

export default function Inicio() {

    const [totalPlatillos, setTotalPlatillos] = useState(0);
    const [totalOrdenes, setTotalOrdenes] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);

    useEffect(() => {
        axios.get(`${endpoint}/platillos`)
        .then(res => {
            setTotalPlatillos(res.data.data.length);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`${endpoint}/ordenesPlatillos`)
        .then(res => {
            setTotalOrdenes(res.data.data.length);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`${endpoint}/inventarios`)
        .then(res => {
            setTotalProductos(res.data.data.length);
        })
        .catch(err => {
            console.log(err);
        })
    } ,[])


    const date = new Date();
    const hour = date.getHours();
    let time = '';

    if(hour < 12){
        time = 'buenos días! 🌤️';
    }else if(hour >= 12 && hour < 19){
        time = 'buenas tardes! ☀️';
    }else{
        time = 'buenas noches! 🌙';
    }

    return (
        
        <Layout>
            <div className='overflow-y-auto h-screen'>

                <h1 className='text-white font-black text-6xl text-center mb-10 mt-6'>¡Bienvenido, {time}</h1>
                <h1 className='text-white font-medium text-3xl text-center mt-3'>Sushi Bar | Página Administrativa</h1>
                
                <main className='mt-10 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4'>
                    <CardHome name="Platillos" comidas={"/sushiii.jpg"} description="Platillos" conxt={totalPlatillos} index={1} ruta="/platillos"/>
                    <CardHome name="Órdenes" comidas={"/rest.png"} description="Órdenes" conxt={totalOrdenes} index={2} ruta="/ordenes"/>
                    <CardHome name="Inventario" comidas={"/camaron.jpg"} description="Productos" conxt={totalProductos} index={3} ruta="/inventario"/>
                </main>

            </div>
        </Layout>
    )
}