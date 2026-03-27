import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PantallaInicio from './components/pantalla_inicio.jsx';
import MenuProfesor from './menu/MenuProfesor.jsx';
import MenuAlumno from './menu/Menu_alum.jsx';
import ExpedienteConducta from './busqueda/ExpedienteConducta.jsx';
import ProfesoresLista from './paginas/ProfesoresLista';
import PanelDirect from './paginas/Paneldirect';  // ← CORREGIDO
import ProfesoresBorrar from './paginas/ProfesoresBorrar';
import RegistroMaestros from './paginas/RegistroMaestros';
import Estudiantes from './paginas/Estudiantes';
import RegistroDemeritos from './busqueda/RegistroDemeritos.jsx';
import HistorialEstudiante from './components/HistorialEstudiante.jsx';
import HistorialDirector from './components/HistorialDirector.jsx';
import CuadroHistorial from './components/CuadroHistorial.jsx';
import Deméritos from './components/Deméritos.jsx';
import HistorialVacio from './components/HistorialVacio.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PantallaInicio />} />
        <Route path="/menu-profesor" element={<MenuProfesor />} />
        <Route path="/menu-alumno" element={<MenuAlumno />} />
        <Route path="/expediente-conducta" element={<ExpedienteConducta />} />
        <Route path="/MenuDirector" element={<PanelDirect />} />
        <Route path="/GestionarMaestros" element={<ProfesoresLista />} />
        <Route path="/BorrarMaestros" element={<ProfesoresBorrar />} />
        <Route path="/AgregarMaestros" element={<RegistroMaestros />} />
        <Route path="/EstudiantesDemeritos" element={<Estudiantes />} />
        <Route path="/registro-demeritos" element={<RegistroDemeritos />} />
        <Route path="/historial-estudiante" element={<HistorialEstudiante />} />
        <Route path="/historial-director" element={<HistorialDirector />} />
        <Route path="/cuadro-historial" element={<CuadroHistorial />} />
        <Route path="/demeritos" element={<Deméritos />} />
        <Route path="/historial-vacio" element={<HistorialVacio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;