import { useState } from 'react';
import LoginInput from './datos_de_entrada.jsx';
import LoginButton from './boton_de_registro.jsx';
import blueImage from '../assets/blue2.png';

const LoginForm = () => {
  const [nie, setNie] = useState('');

  return (
    <div id="formulario" style={{
      backgroundImage: `url(${blueImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '68px',              // ← TAMAÑO ORIGINAL
      borderRadius: '55px',
      border: '0.9px solid white',
      width: '90%',
      maxWidth: '600px',            // ← TAMAÑO ORIGINAL
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center' }}>Bienvenido</h1>
      <p style={{ textAlign: 'center' }}>Ingrese para continuar</p>
      
      <br></br>
      <LoginInput type="password" placeholder="Contraseña" setNie={setNie} />
      
      <LoginButton nie={nie} />
      
      <div id="olvidastes" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="#" style={{ color: 'white' }}>¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default LoginForm;