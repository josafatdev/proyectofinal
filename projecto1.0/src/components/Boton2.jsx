import { Link } from 'react-router-dom';
import '../App.css'

function Boton2(){

    return(
        <div>
            <Link to="/BorrarMaestros">
            <button className='BotonMaestro2'>
                Eliminar Maestro
            </button>
            </Link>
        </div>
    );
}

export default Boton2