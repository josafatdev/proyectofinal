import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './ExpedienteConducta.css';
import icono from '../assets/icon-icons(2).svg';
import fondo from '../assets/blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpedienteConducta = () => {
  const navigate = useNavigate();
  const [nie, setNie] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!nie.trim()) {
      alert('Por favor ingresa un NIE');
      return;
    }

    setLoading(true);

    try {
      const conexion = await fetch("http://localhost/backend/consultarDemeritos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({nie: nie.trim()})
      });

      const data = await conexion.json();

      if (data.success && data.tipo === "estudiante") {
        localStorage.setItem('estudianteBuscado', JSON.stringify({
          tipo: 'estudiante',
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          nie: data.nie,
          grado: data.grado,
          seccion: data.seccion,
          turno: data.turno,
          tiene_demeritos: data.tiene_demeritos, 
          total_demeritos: data.total_demeritos
        }));

        navigate(data.tiene_demeritos ? '/historial-estudiante' : '/historial-vacio');

      } else {
        alert('NIE no registrado');
      }
    } catch (error) {
      console.error("Error al buscar el estudiante:", error);
      alert("Error de conexión con el servidor...");
    } finally {
      setLoading(false);
    }

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

      {/* Contenido principal - tu diseño original */}
      <div className="position-relative d-flex justify-content-center align-items-center min-vh-100 p-4" style={{ zIndex: 2 }}>
        <div className="expediente-card" style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          maxWidth: '700px',
          width: '90%',
          overflow: 'hidden',
          backdropFilter: 'blur(5px)'
        }}>
          <div className="expediente-contenido" style={{ padding: '40px', textAlign: 'center' }}>
            <div className="expediente-icono">
              <img src={icono} alt="icono" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
            </div>

            <div className="expediente-texto">
              <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '10px' }}>Expediente de Conducta</h1>
              <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>Consulta de Deméritos</p>

              <div className="expediente-buscador" style={{ display: 'flex', gap: '10px' }}>
                <input 
                  value={nie}
                  onChange={(e) => setNie(e.target.value)}
                  disabled={loading}
                  type="text" 
                  placeholder="NIE"
                  style={{
                    flex: 1,
                    padding: '12px 15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '25px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <button 
                  onClick={handleBuscar}
                  disabled={loading}
                  style={{
                    padding: '12px 25px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Buscar
                </button>
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
};

export default ExpedienteConducta;