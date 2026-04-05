import { useState } from 'react';
import icono from '../assets/icon-icons(1).svg';

const LoginButton = ({nie}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      console.log("Hola:", nie);
      const conexion = await fetch("http://localhost/backend/registroAlumno.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({nie})
      });

      const data = await conexion.json();

      if (data.tipo === "estudiante") {
        localStorage.setItem('authUser', JSON.stringify({
          tipo: 'estudiante',
          nombre: data.nombre,
          apellido: data.apellido,
          nie: data.nie,
          grado: data.grado,
          turno: data.turno
        }));
         window.location.href = '/menu-alumno';
      } else if (data.tipo === "maestro") {
        localStorage.setItem('authUser', JSON.stringify({
          tipo: 'maestro',
          nombre: data.nombre
        }));
        window.location.href = '/menu-profesor';
      } else if (data.tipo === "director") {
        window.location.href = '/MenuDirector';
      } else {
        alert('¡Cotraseña Incorrecta!');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      setLoading(false);
    }
    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={handleLogin}
        style={{
          width: '80%',
          padding: '18px 12px',
          background: loading ? 'linear-gradient(135deg, #4a4e69 0%, #5a4a6e 100%)' : 'linear-gradient(135deg, #667eea 0%, #d42fa3 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '18px',
          cursor: loading ? 'wait' : 'pointer',
          marginTop: '10px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? (
          <>
            <span style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              border: '2px solid white',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <b>Cargando...</b>
          </>
        ) : (
          <>
            <b>Iniciar Sesión</b>
            <img src={icono} alt="" style={{ width: '18px', height: '18px' }} />
          </>
        )}
      </button>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginButton;