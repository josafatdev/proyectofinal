import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
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
    especialidad: '',
    contra: ''
  });

  const manejoCambio = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  async function manejarEnvio(event) {
    event.preventDefault();

    if (!inputs.nombreMaestro || !inputs.edadMaestro || !inputs.especialidad || !inputs.contra) {
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
  const particulas = useMemo(() => {
    const nuevasParticulas = [];
    for (let i = 0; i < 50; i++) {
      nuevasParticulas.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    return nuevasParticulas;
  }, []);

  return (
    <div
      className="position-relative vh-100 overflow-hidden"
      style={{
        backgroundColor: '#dad4f8',
        position: 'relative'
      }}
    >

      {/* Fondo con blur */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${blueImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',        
          transform: 'scale(1.05)',   
          zIndex: 0
        }}
      />

      {/* Capa oscura */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }}
      />

      {/* Contenedor centrado */}
      <div className="d-flex justify-content-center align-items-center h-100 w-100 position-relative" style={{ zIndex: 2 }}>
        <div className="panelito" style={{
          border: '1px solid rgba(255, 255, 255, 0.18)',
          background: 'linear-gradient(135deg, rgba(4, 9, 20, 0.86), rgba(13, 33, 65, 0.9))',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px',
          padding: '30px 40px',
          width: '850px',
          height: 'auto',
          minHeight: '480px',
          boxShadow: '0 25px 45px rgb(1, 5, 29), 0 0 0 1px rgba(21, 74, 117, 0.19)',
        }}>

          {/* Foto a la izquierda */}
          <div className="left" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div
              className="avatar"
              style={{
                width: '120px',
                height: '120px',
                fontSize: '50px',
                background: 'linear-gradient(135deg, #fff, #9fb6b4)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#123c8c',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span>👤</span>
            </div>
            <p style={{
              fontSize: '13px',
              opacity: 0.8,
              color: 'white',
              fontWeight: '500',
              marginTop: '15px',
              textAlign: 'center'
            }}>Agregar Foto de Perfil</p>
          </div>

          {/* Formulario */}
          <div className="right" style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 30px',
            width: '100%'
          }}>
            <h1 style={{
              marginBottom: '25px',
              textAlign: 'center',
              fontSize: '32px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>📝 Registro de Maestros</h1>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'left',
                color: 'white',
                display: 'block',
                marginBottom: '6px'
              }}>Nombre del Maestro:</label>
              <input
                type="text"
                placeholder="Ingrese el nombre completo..."
                name="nombreMaestro"
                onChange={manejoCambio}
                style={{
                  padding: '12px 16px',
                  borderRadius: '30px',
                  border: 'none',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #ff9900'}
                onBlur={(e) => e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'left',
                color: 'white',
                display: 'block',
                marginBottom: '6px'
              }}>Edad:</label>
              <input
                type="number"
                placeholder="Ingrese la edad..."
                name="edadMaestro"
                onChange={manejoCambio}
                style={{
                  padding: '12px 16px',
                  borderRadius: '30px',
                  border: 'none',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #ff9900'}
                onBlur={(e) => e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'left',
                color: 'white',
                display: 'block',
                marginBottom: '6px'
              }}>Especialidad:</label>
              <input
                type="text"
                placeholder="Ingrese la especialidad..."
                name="especialidad"
                onChange={manejoCambio}
                style={{
                  padding: '12px 16px',
                  borderRadius: '30px',
                  border: 'none',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #ff9900'}
                onBlur={(e) => e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'left',
                color: 'white',
                display: 'block',
                marginBottom: '6px'
              }}>Contraseña:</label>
              <input
                type="password"
                placeholder="Ingrese una contraseña..."
                name="contra"
                onChange={manejoCambio}
                style={{
                  padding: '12px 16px',
                  borderRadius: '30px',
                  border: 'none',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #ff9900'}
                onBlur={(e) => e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'}
              />
            </div>

            <button
              className="btn"
              onClick={manejarEnvio}
              style={{
                marginTop: '10px',
                padding: '12px 25px',
                border: 'none',
                borderRadius: '35px',
                background: 'linear-gradient(135deg, #ff9900, #ff6600)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Añadir Maestro ✨
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