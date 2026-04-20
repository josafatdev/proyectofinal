import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MenuProfesor.css';
import icono from '../assets/icon-icons(2).svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import blueImage from '../assets/blue.png';

const MenuProfesor = () => {
  const navigate = useNavigate();  // ← CORREGIDO

  const [profesor, setProfesor] = useState(null);

  useEffect(() => {
    const datos = localStorage.getItem('authUser');
    if (datos){
      const usuario = JSON.parse(datos);
      if (usuario.tipo === 'maestro'){
        setProfesor(usuario);
      }
    }
  }, []);

  const handleCerrarSesion = () => {
    if (confirm('⚠️ ¿Estás a punto de cerrar sesión?')) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('estudianteBuscado');
      window.location.href = '/';
    }
  };

  const handleBuscarEstudiante = () => {
    navigate('/expediente-conducta');  // ← Va a ExpedienteConducta
  };

  // Generar partículas
  const particulas = [];
  for (let i = 0; i < 40; i++) {
    particulas.push({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  return (
    <div className="menu-profesor-container">
      <div className="menu-profesor-wrapper">
        <div className="contenido-menu">
          
          <div className="seccion-izquierda">
            <div className="profesor-nombre">
              <img 
                src="/src/assets/round-account-button-with-user-inside_icon-icons.com_72596.png" 
                alt="Icono profesor" 
              />
              <h2>Profesor</h2>
              <h3>{profesor?.nombre || 'Cargando...'}</h3>
            </div>

            <div className="sistema-info">
              <p>
                Aquí puedes gestionar consultas sobre el comportamiento escolar de manera eficiente.
              </p>
            </div>

            <button className="boton-cerrar" onClick={handleCerrarSesion}>
              <b>Cerrar Sesión</b>
            </button>
          </div>

          <div className="seccion-derecha">
            <div className="contenido-derecha">
              <div id="fondoicon">
                <div className="sistema-info">
                  <h3>Sistema de gestión escolar</h3>
                </div>

                <img src={icono} alt="Icono" />

                <h3>📚 Bienvenido✏️</h3>
                <p>Selecciona un estudiante<br />para ver su comportamiento</p>
                
                <button id="verde" onClick={handleBuscarEstudiante}>
                  <b>Buscar estudiante</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="particulas-encima">
        {particulas.map((p, i) => (
          <div 
            key={i} 
            className="particula"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuProfesor;