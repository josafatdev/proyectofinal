import "./HistorialDirector.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo from '../assets/blue.png';
import tuxEscribiendo from '../assets/TuxEscribiendo.gif';

function HistorialVacio() {
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);

  useEffect(() => {
    const buscado = localStorage.getItem('estudianteBuscado');
    if (buscado){
      setEstudiante(JSON.parse(buscado));
      return;
    }

    const auth = localStorage.getItem('authUser');
    if (auth) {
      const persona = JSON.parse(auth);
      if (persona.tipo === 'estudiante'){
        setEstudiante(persona);
      }
    }
  }, []);

  const esPersonal = () => {
    const auth = JSON.parse(localStorage.getItem('authUser') || 'null');
    return auth && (auth.tipo === 'maestro' || auth.tipo === 'director');
  };

  const handleAgregarDemerito = () => {
    navigate("/demeritos", { state: {estudiante} });
  };

  // Generar partículas
  const particulas = [];
  for (let i = 0; i < 50; i++) {
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
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Capa de vidrio */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(3px)',
          zIndex: 0
        }}
      />

      {/* Partículas flotantes */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 1, pointerEvents: 'none' }}>
        {particulas.map((p, i) => (
          <div 
            key={i} 
            className="position-absolute rounded-circle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              opacity: p.opacity,
              animation: `flotar ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="position-relative" style={{ zIndex: 2 }}>
        <Navbar />

        <div className="contenedor-historial">
          <div className="info-principal">
            <div className="avatar-container">
              <div className="avatar" style={{ width: '100px', height: '100px', fontSize: '40px' }}>
                <span>👤</span>
              </div>
            </div>
            <div className="info-estudiante">
              <h2>
                {estudiante
                  ? `${estudiante.nombre || ''} ${estudiante.apellido || ''}`.trim()
                  : 'Cargando estudiante...'
                }
              </h2>
              <p><strong>NIE:</strong> {estudiante?.nie || 'Cargando...'}</p>
              <p><strong>Turno:</strong> {estudiante?.turno || 'Cargando...'}</p>
              <p><strong>Grado:</strong> {estudiante?.grado || 'Cargando...'}</p>
            </div>
          </div>

          <div className="historial-vacio-contenido">
            <div className="mensaje-vacio">
              <p><b>No hay deméritos registrados</b></p>

              <img 
                src={tuxEscribiendo} 
                alt="Tux escribiendo" 
                className="tux-escritura"
                style={{
                  width: '150px',
                  height: 'auto',
                  margin: '10px auto',
                  display: 'block',
                  borderRadius: '12px',
                  padding: '10px'
                }}
              />

              {esPersonal() && (
              <button 
                className="btn-agregar-demerito" 
                onClick={handleAgregarDemerito}
                style={{
                  background: 'linear-gradient(135deg, #3b5cee 0%, #9f57e7 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '40px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '18px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                + Agregar Demérito
              </button>
              )}

            </div>
          </div>
        </div>
      </div>

      <style>
        {`
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

          .tux-escritura {
            transition: transform 0.3s ease;
          }
          
          .tux-escritura:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default HistorialVacio;