import '../App.css'
import maribase from '../assets/maribase.png'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import blueImage from '../assets/blue.png';

function PanelDirect() {
    const navigate = useNavigate();

    const gestionar = () => {
        navigate("/GestionarMaestros")
    };

    const ilumnos = () => {
        navigate("/EstudiantesDemeritos")
    };

    const agregarDemeritos = () => {
        navigate("/expediente-conducta")
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
                backgroundImage: `url(${blueImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Capa de vidrio */}
            <div 
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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

            
            <div className="app-container position-relative" style={{ zIndex: 2 }}>
                <div className="panel">
                    {/* Titulo */}
                    <h1 className="titulo">Panel de administración</h1>

                    {/* Botones */}
                    <div className="opciones">
                        <div className="opcion verde" onClick={gestionar}>
                            <span>👨‍🏫​</span>
                            <p>Gestionar<br />Maestros</p> 
                        </div>
                        
                        <div className="opcion Amarilla" onClick={agregarDemeritos}>
                            <span>⚠️​</span>
                            <p>Agregar<br />deméritos</p> 
                        </div>
                        
                        <div className="opcion rosa with-image" onClick={ilumnos}>
                            <span>🎓​​</span>
                            <p>Ilumno con<br />deméritos</p>
                            <img src={maribase} alt="img" className="side-image" /> 
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

export default PanelDirect;