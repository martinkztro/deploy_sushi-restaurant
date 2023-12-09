import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Platillos from './pages/Platillos';
import Ordenes from './pages/Ordenes';
import Inventario from './pages/Inventario';
import Clientes from './pages/Clientes';
import Inicio from './pages/Inicio';
import EditarCliente from './components/EditarCliente';
import EditarProducto from './components/EditarProducto';
import EditarPlatillo from './components/EditarPlatillo';
import EditarOrden from './components/EditarOrden';


export default function App() {

  return (
   
    
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login/>}/>
      <Route path="/inicio" element={<Inicio/>}/> 
    
      <Route path="/platillos" element={<Platillos/>}/>
      <Route path="/platillo/:id" element={<EditarPlatillo/>}/>

      <Route path="/ordenes" element={<Ordenes/>}/>
      <Route path="/orden/:id" element={<EditarOrden/>}/>

      <Route path="/inventario" element={<Inventario/>}/>
      <Route path='/producto/:id' element={<EditarProducto/>}/>

      <Route path="/clientes" element={<Clientes/>}/>
      <Route path="/cliente/:id" element={<EditarCliente />} />

    </Routes>
    
    </BrowserRouter>
   
  );
  
}
