import '../App.css'
import { Link } from 'react-router-dom';

function Boton(){

    return(
        <div>
            <Link to="/AgregarMaestros">
            <button className='BotonMaestro'>
                Agregar Maestro
            </button>
            </Link>
        </div>
    );
}

export default Boton