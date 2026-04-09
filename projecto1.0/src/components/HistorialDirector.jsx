import { useEffect, useState } from "react";
import "./HistorialDirector.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo from '../assets/blue.png';

function HistorialDirector() {
  const navigate = useNavigate();

  const handleAgregarDemeritos = () => {
    navigate("/registro-demeritos");
  };

  const [estudiante, setEstudiante] = useState(null);

  useEffect(() => {
    const buscado = localStorage.getItem('estudianteBuscado');
    if (buscado){
      setEstudiante(JSON.parse(buscado));
      return;
    }

    const datos = localStorage.getItem('authUser');
    if (datos){
      const persona = JSON.parse(datos);
      if (persona.tipo === 'estudiante'){
        setEstudiante(persona);
      }
    }
  }, []);
  
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

          <div className="fila-superior">
            <div className="actividad">
              <h4>1. Comer en clase</h4>
              <p>El estudiante estaba comiendo 6 pupusas de frijol con queso mientras sus compañeros estaban exponiendo.</p>
              <span className="fecha">26 de marzo del 2026, 8:50 AM</span>
              <p className="maestro">Maestro responsable del reporte: Franklin Barahona</p>
            </div>

            <div className="acciones">
              <h4>Acciones Correctivas</h4>
              <div className="checklist">
                <label className="check-item">
                  <input type="checkbox" />
                  <span>Barrer el polvo de la cancha.</span>
                </label>
                <label className="check-item">
                  <input type="checkbox" />
                  <span>Comprar pupusas para todo el grado.</span>
                </label>
              </div>
              <div className="botones-acciones">
                <button className="btn" onClick={handleAgregarDemeritos}>
                  Agregar Deméritos
                </button>
                <button className="btn">Eliminar Deméritos</button>
              </div>
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
        `}
      </style>
    </div>
  );
}

export default HistorialDirector;