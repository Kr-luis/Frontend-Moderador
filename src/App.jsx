import './App.css';
import { PaginaInicial } from './pages/PaginaInicial.jsx';
import { Productos } from './pages/Productos.jsx';
import Ingresar from './pages/Ingresar.jsx';
import { Registrar } from './pages/Registrar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
import Auth from './layout/Auth';
import { PrivateRoute } from './routes/PrivateRoute.jsx';
import Forgot from './pages/Forgot.jsx';
import { NoEncontrada } from './pages/NoEncontrada.jsx';
import { Confirmar } from './pages/ConfirmarEmail';
import { Confirmartienda } from './pages/confirmartienda.jsx';
import Restablecer from './pages/Restablecer';
import Listar from './pages/Listar.jsx';
import Crear from './pages/Crear.jsx';
import BuscarProducto from './pages/BuscarProducto.jsx';
import Dashboard from './layout/Dashboard.jsx';
import DashboardAdmin from './layout/DashboardAdmin.jsx';
import Listartienda from './pages/Listartienda.jsx';
import Confirmacion_registro_tienda from './pages/Confirmacion_registro_tienda.jsx';
import CrearProducto from './pages/CrearProductos.jsx';
import AdministrarTienda from './pages/AdministrarTienda.jsx';
import AdministrarProducto from './pages/AdministrarProducto.jsx';
import Terminos from './pages/Terminos.jsx';
import ApkDownload from './pages/ApkDownload.jsx';
import Moderadores from './pages/Moderadores.jsx';
import CrearModerador from './pages/CrearModerador.jsx';
import Listartiendaadmin from './pages/Listatiendaadmin.jsx';
import TablaProductosAdmin from './components/TablaProductosAdmin.jsx';
import Listarproductosadmin from './pages/Listaproductosadmin.jsx';
import Home from "./pages/Administrador/Home.jsx"
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx'
import Login from './pages/login/Login.jsx'
import New from './pages/new/New.jsx'
import Add from './pages/add/Add.jsx';
import Mods from './pages/mods/Mods.jsx';
import Acount from './pages/acount/Acount.jsx';
import Users from './pages/users/Users.jsx';
import NewT from './pages/newT/NewT.jsx';
import NewU from './pages/newU/NewU.jsx'
import Lmod from './pages/Lmod/Lmod.jsx';
import Profile from './pages/profile/Profile.jsx';
import ProfileU from './pages/profileU/profileU.jsx';
import { productInputs, userInputs, tiendaInputs, moderadorInputs } from "./formSource";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext.jsx';
import "./style/dark.scss"

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Lmod />} />
            <Route path="/" element={<Auth />}>
              <Route path="ingresar" element={<Ingresar />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="usuario/confirmar/:token" element={<Confirmar />} />
              <Route path="/confirmartienda/:tokentienda" element={<Confirmartienda />} />
              <Route path="forgot/:id" element={<Forgot />} />
              <Route path="/usuario/recuperar-password/:token" element={<Restablecer />} />
              <Route path="dashboardadmin" element={<DashboardAdmin />} />
              <Route path="dashboardadmin/crearmoderador" element={<CrearModerador />} />
              <Route path="dashboardadmin/listartiendaadmin" element={<Listartiendaadmin />} />
              <Route path="/listarproductosadmin/:tiendaId" element={<Listarproductosadmin />} />
              <Route path="productos/:tiendaId" element={<TablaProductosAdmin />}/>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="dashboard/listar" element={<Listar />} />
              <Route path="dashboard/confirmacion" element={<Confirmacion_registro_tienda />} />
              <Route path="dashboard/crear" element={<Crear />} />
              <Route path="dashboard/listartienda" element={<Listartienda />} />
              <Route path="dashboard/buscar" element={<BuscarProducto />} />
              <Route path="dashboard/crearproducto" element={<CrearProducto />} />
              <Route path="dashboard/administrartienda" element={<AdministrarTienda />} />
              <Route path="dashboard/actualizarproducto" element={<AdministrarProducto />} />
              <Route path="terminos" element={<Terminos />} />
              <Route path="apk-download" element={<ApkDownload />} />
              <Route path="moderadores" element={<Moderadores />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="loginMod" element={<Lmod />} />
              <Route path="profile" element={<Profile modId={localStorage.getItem("id_usuario")} />} />
              <Route path="tiendas">
                <Route index element={<List/>}/>
                <Route path="/tiendas/:id" element={<Single />} />
                <Route path="newt" element={<NewT inputs={tiendaInputs} title="Agregar nueva Tienda"/>} />
              </Route>
              <Route path="moderadores">
                <Route index element={<Mods/>}/>
                <Route path=":modId" element={<Acount />} />
                <Route path="add" element={<Add inputs={moderadorInputs} title="Agregar Nuevo Moderador"/>} />
              </Route>
              <Route path="users">
                <Route index element={<Users/>}/>
                <Route path=":id" element={<ProfileU />} />
                <Route path="newU" element={<NewU inputs={userInputs} title="Agregar Nuevo Usuario"/>} />
              </Route>
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
