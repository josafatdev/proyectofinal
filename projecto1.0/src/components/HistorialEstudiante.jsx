import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HistorialDirector.css";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo from '../assets/blue.png';

function HistorialEstudiante() {

  const location = useLocation();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);
  const [demeritos, setDemeritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try{
        const buscado = localStorage.getItem('estudianteBuscado');
        if (buscado){
          setEstudiante(JSON.parse(buscado));
        } else {
          const datos = localStorage.getItem('authUser');
          if (datos){
            const persona = JSON.parse(datos);
          if (persona.tipo === 'estudiante'){
            setEstudiante(persona);
          }
          }
        }

        const estData = buscado ? JSON.parse(buscado) : JSON.parse(localStorage.getItem('authUser')||'null');
        if (estData?.id) {
          const respuesta = await fetch("http://localhost/backend/obtenerHistorial.php", {
            method: "POST",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              id_estudiante: estData.id
            })
          });

          const data = await respuesta.json();
          
          if (data.success){
            setDemeritos(data.demeritos);
          }
        } 
      } catch (err) {
          console.error("Error cargando historial...", err)
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [location.state?.refresh]);

  const handleAgregarOtroDemerito = () => {
    if (estudiante?.id){
      navigate("/demeritos", { state: {estudiante}});
    } else {
      alert('No se pudo identificar...')
    }
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

  const esPersonal = () => {
    const auth = JSON.parse(localStorage.getItem('authUser') || 'null');
    return auth && (auth.tipo === 'maestro' || auth.tipo === 'director');
  };

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
            {loading ? (
              <p style={{ textAlign: 'center', padding: '20px',}}>Cargando Historial...</p>
            ) : demeritos.length > 0 ? (
              demeritos.map((demerito, index) => (
                <div key={demerito.id || index} className="actividad" style={{ marginBottom: '25px' }}>
                  <h4>{index + 1}. {demerito.descripcion}</h4>
                  <p className="fecha"><strong>Fecha:</strong> {demerito.fecha ? new Date(demerito.fecha).toLocaleDateString('es-SV') : '---'}</p>
                  <p className="maestro"><strong>Maestro Responsable:</strong> {demerito.responsable}</p>

                {demerito.acciones?.length > 0 && (
                  <div className="acciones" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee'}}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '14px',  color: '#666'}}>Acciones Correctivas</h4>
                    <div className="checklist">
                    {demerito.acciones.map((accion, i) => (
                      <div key={i} className="check-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0'}}>
                        <input type="checkbox" disabled style={{ width: '16px', height: '16px' }} />
                        <span>{accion}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                )}

                <span className="fecha" style={{ fontSize: '13px', color: '#666', display: 'block', marginTop: '10px' }}>
                  Registrado: {demerito.fecha_registro ? new Date(demerito.fecha_registro).toLocaleString('es-SV') : ''} 
                </span>
          </div>
            ))
            ) : (
              <div className="mensaje-vacio" style={{textAlign: 'center', padding: '30px', color: '#666'}}>
                <p>No hay deméritos registrados</p>
              </div>
            )}

            {esPersonal() && estudiante?.id && (
              <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '2px dashed #ccc' }}>
                <button 
                  onClick={handleAgregarOtroDemerito}
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
                  + Agregar otro demérito
                </button>
              </div>
            )}

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

export default HistorialEstudiante;