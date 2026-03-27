import '../App.css'

function Boton3({onEliminar, disabled}){

    return(
        <div>
            <button className='BotonMaestro2' onClick={onEliminar} disabled={disabled}>
                Eliminar
            </button>
        </div>
    );
}

export default Boton3