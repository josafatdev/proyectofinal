import { useState, useEffect, useRef } from 'react';
import '../App.css';
import Ham from '../assets/Ham.png';
import Back from '../assets/Back.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const hamburguesaRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleCerrarSesion = () => {
    if (confirm('⚠️ ¿Estás a punto de cerrar sesión?')) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('estudianteBuscado');
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuAbierto && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          hamburguesaRef.current &&
          !hamburguesaRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAbierto]);

  return (
    <div>
      <nav style={{
        display: 'flex',
        height: '70px',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        margin: '0 auto',
        marginTop: '35px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0, 6, 15, 0.4)',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
        border: '1px solid white'
      }}>
        <div onClick={toggleMenu} ref={hamburguesaRef} style={{ cursor: 'pointer' }}>
          <img src={Ham} alt="Menú" style={{ height: '45px', marginLeft: '22px' }} />
        </div>

        <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          <img src={Back} alt="Atrás" style={{ height: '45px', marginRight: '25px' }} />
        </div>
      </nav>

      {menuAbierto && (
        <div 
          ref={menuRef} 
          style={{
            position: 'fixed',
            top: '90px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            minWidth: '200px',
            zIndex: 9999,
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'fadeInDown 0.3s ease-out'
          }}
        >
          <button 
            onClick={handleCerrarSesion}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(221, 58, 58, 0.8)';
              e.currentTarget.style.paddingLeft = '25px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.paddingLeft = '20px';
            }}
          >
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;