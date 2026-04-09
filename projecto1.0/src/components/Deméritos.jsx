import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Deméritos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo from '../assets/blue.png';

function Demeritos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [estudiante, setEstudiante] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [responsable, setResponsable] = useState('');

  useEffect(() => {
    const estudia = location.state?.estudiante || JSON.parse(
      localStorage.getItem('estudianteBuscado')||'null'
    );

    if (estudia){ 
      setEstudiante(estudia);
    }
    const profeso = JSON.parse(localStorage.getItem('authUser')||'null');
    if (profeso?.tipo === 'maestro'){
      setResponsable(`${profeso.nombre}`.trim());
    }
  }, [location.state]);

  const handleSiguiente = () => {
    if (!descripcion.trim() || !responsable.trim()){
      alert('Completa todos los campos...');
      return;
    }

    if (!estudiante?.id){
      alert('Error: No se identifico al estudiante');
      return;
    }

    navigate("/registro-demeritos", {
      state: {
        estudiante,
        demeritoData: {
          descripcion: descripcion.trim(),
          fecha,
          responsable: responsable.trim()
        }
      }
    });
  };
  
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
      
      style={{ 
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      <div 
        
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(3px)',
          zIndex: 0
        }}
      />

     
      <div style={{ zIndex: 1, pointerEvents: 'none' }}>
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

     
      <div style={{ zIndex: 2 }}>
        <div className="frame" style={{ background: 'transparent', boxShadow: 'none' }}>
          <div className="card">
            <h1>Registro de Deméritos</h1>

            <div className="field">
              <label>Descripción</label>
              <input 
                type="text" 
                placeholder="Describe el problema..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Fecha y Hora</label>
              <input 
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)} 
              />
            </div>

            <div className="field">
              <label>Maestro Responsable</label>
              <input 
                type="text"
                placeholder="Encargado del reporte..." 
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
            </div>

            <button onClick={handleSiguiente} className="btn">Siguiente</button>
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

export default Demeritos;