import { useEffect, useRef } from 'react';
import LoginForm from './LoginForm.jsx';
import blueImage from '../assets/blue.png';
import tuxImage from '../assets/tux.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const PantallaInicio = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="position-relative vh-100 d-flex justify-content-center align-items-center overflow-hidden"
         style={{
           backgroundImage: `url(${blueImage})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>

      <canvas ref={canvasRef} className="position-absolute top-0 start-0 w-100 h-100"
              style={{ pointerEvents: 'none', opacity: 0.4, zIndex: 0 }} />
      
      {/* Formulario (capa media) */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <LoginForm />
      </div>
      
      {/* Imagen Tux ENCIMA del formulario */}
      <img 
        src={tuxImage}
        alt="Tux"
        className="position-absolute"
        style={{
          left: '15%',
          bottom: '10%',
          width: '255px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 3,            
          animation: 'float 3s ease-in-out infinite'
        }}
      />

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default PantallaInicio;