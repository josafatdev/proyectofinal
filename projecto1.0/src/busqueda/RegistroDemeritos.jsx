import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RegistroDemeritos.css';
import fondo from '../assets/blue.png';
import tuxImage from '../assets/tux.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistroDemeritos() {

  const navigate = useNavigate();
  const location = useLocation();
  const [estudiante, setEstudiante] = useState(null);
  const [demeritoData, setDemeritoData] = useState(null);
  const [acciones, setAcciones] = useState([]);
  const [nuevaAccion, setNuevaAccion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { estudiante, demeritoData } = location.state || {};

    if (estudiante && demeritoData) {
      setEstudiante(estudiante);
      setDemeritoData(demeritoData);
    } else {
      const estudia = JSON.parse(localStorage.getItem('estudianteBuscado')||'null');
      if (estudia){
        setEstudiante(estudia);
      } else {
        navigate('/expediente-conducta');
      }
    }
  }, [location.state, navigate]);

  const handleInsertarAccion = () => {
    if (nuevaAccion.trim() && !acciones.includes(nuevaAccion.trim())){
      setAcciones([...acciones, nuevaAccion.trim()]);
      setNuevaAccion('');
    }
  };

  const handleTerminar = async () => {
    if (!estudiante?.id || !demeritoData) {
      alert('Error: Datos Incompletos');
      return;
    }

    setLoading(true);

    try{
      const respuesta = await fetch("http://localhost/backend/agregarDemerito.php", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          id_estudiante: estudiante.id,
          descripcion: demeritoData.descripcion,
          fecha: demeritoData.fecha,
          responsable: demeritoData.responsable,
          acciones: acciones
        })
      });

      const data = await respuesta.json();
      if (data.success) {
        localStorage.removeItem('estudianteBuscado');
        navigate('/historial-estudiante', { replace: true, state: { refresh: true } });
      } else {
        alert('Error: ' + (data.error || 'No se pudo guardar'));
      }
    } catch (err) {
      console.error(err);
      alert('Error de Conexion');
    } finally {
      setLoading(false);
    }
  };

  // Generar partículas UNA SOLA VEZ
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
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(2px)',
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
      <div className="position-relative d-flex justify-content-center align-items-center min-vh-100 p-4" style={{ zIndex: 2 }}>
        <div className="registro-card">
          <h1>Registro de Deméritos</h1>
          <div className="label">Acciones Correctivas:</div>

          <div className="input-group">
            <input 
              type="text" 
              placeholder=" 📏  Acciones para corregir el demérito..." 
              value={nuevaAccion}
              onChange={(e) => setNuevaAccion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInsertarAccion()}
            />
            <button id="insert" onClick={handleInsertarAccion}>Insertar</button>
          </div>

          <div className="btn-finalizar">
            <button onClick={handleTerminar} disabled={loading}>
              {loading ? 'Guardando...' : 'Terminar'}
            </button>
          </div>

          <img src={tuxImage} alt="tux" className="pinguino" />
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