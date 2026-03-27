import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import blueImage from '../assets/blue.png';

function RegistroMaestros() {
  const navigate = useNavigate();

  const anadir = () => {
    navigate("/GestionarMaestros", { replace: true });
  };

  const [inputs, setInputs] = useState({
    nombreMaestro: '',
    edadMaestro: '',
    especialidad: ''
  });

  const manejoCambio = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  async function manejarEnvio(event) {
    event.preventDefault();

    if (!inputs.nombreMaestro || !inputs.edadMaestro || !inputs.especialidad) {
      alert("Completa todos los campos...");
      return;
    }

    console.log('Datos:', inputs);

    try {
      const respuesta = await fetch('http://localhost/backend/mandarDatos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });

      if (respuesta.ok) {
        const resultado = await respuesta.json();
        console.log('Respuesta del Servidor:', resultado);
        anadir();
      } else {
        console.error('Error en...', respuesta.statusText);
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

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
        backgroundColor: '#dad4f8',
        backgroundImage: `url(${blueImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Contenedor centrado */}
      <div className="d-flex justify-content-center align-items-center h-100 w-100 position-relative" style={{ zIndex: 1 }}>
        <div className="panelito">
          {/* Foto a la izquierda */}
          <div className="left">
            <div
              className="avatar"
              style={{ width: '100px', height: '100px', fontSize: '40px' }}
            >
              <span>👤</span>
            </div>
            <p className="left">Agregar Foto de Perfil</p>
          </div>

          {/* Formulario */}
          <div className="right">
            <h1 className="right">Registro de Maestros</h1>

            <div className="right">
              <label className="form-label text-white">Nombre del Maestro:</label>
              <input
                type="text"
                placeholder=" 🔎 Nombre..."
                name="nombreMaestro"
                onChange={manejoCambio}
              />
            </div>

            <div className="right">
              <label className="form-label text-white">Edad:</label>
              <input
                type="text"
                placeholder="🔎  Edad..."
                name="edadMaestro"
                onChange={manejoCambio}
              />
            </div>

            <div className="right">
              <label className="form-label text-white">Especialidad:</label>
              <input
                type="text"
                placeholder=" 🔎  Especialidad..."
                name="especialidad"
                onChange={manejoCambio}
              />
            </div>

            <button
              className="btn"
              style={{ backgroundColor: '#ff9900', color: 'white' }}
              onClick={manejarEnvio}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>

      {/* Partículas */}
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
            z-index: 2;
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
}

export default RegistroMaestros;