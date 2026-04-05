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
    <div 
      className="position-relative vh-100 overflow-hidden"
      style={{ 
        backgroundColor: 'rgb(218, 212, 248)', 
        position: 'relative',
        backgroundImage: `url(${blueImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Contenido principal */}
      <div className="menu-profesor-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contenido-menu">
          
          <div className="seccion-izquierda">
            <div className="profesor-nombre">
              <br />
              <img 
                src="/src/assets/round-account-button-with-user-inside_icon-icons.com_72596.png" 
                alt="Icono profesor" 
                height="113"
                style={{ borderRadius: '50%' }}
              />
              <h2>Profesor</h2>
              <br />
              <h3>{profesor?.nombre || 'Cargando...'}</h3>
            </div>

            <br />

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
                <br />
                <div className="sistema-info">
                  <h3>Sistema de gestión escolar</h3>
                </div>

                <img src={icono} alt="Icono" height="113" />

                <h3>📚 Bienvenido</h3>
                <p>Selecciona un estudiante<br />para ver su comportamiento</p>
                <br />
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

      <style>
        {`
          .particulas-encima {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 3;
            pointer-events: none;
          }
          
          .particula {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            pointer-events: none;
            animation: flotar 8s ease-in-out infinite;
            will-change: transform, opacity;
          }
          
          @keyframes flotar {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
            25% {
              transform: translate(10px, -15px) scale(1.2);
              opacity: 0.8;
            }
            50% {
              transform: translate(-5px, -25px) scale(1);
              opacity: 0.6;
            }
            75% {
              transform: translate(8px, -10px) scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MenuProfesor;