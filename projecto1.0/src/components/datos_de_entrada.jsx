const LoginInput = ({ type, placeholder, setNie }) => {
  return (
    <div style={{ 
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setNie(e.target.value)}
        style={{
          width: '80%',
          padding: '16px 12px',
          border: '1px solid white',
          borderRadius: '17px',
          fontSize: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.19)',
          color: 'white',
          textAlign: 'center',
          boxSizing: 'border-box',
          outline: 'none'
        }}
      />
    </div>
  );
};

export default LoginInput;