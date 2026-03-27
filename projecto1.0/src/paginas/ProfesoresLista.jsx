import '../App.css'
import Navbar from "../components/Navbar";
import Profesores from '../components/Profesores';
import Boton from '../components/Boton';
import Boton2 from '../components/Boton2';

function ProfesoresLista(){
    return(
        <>
        <Navbar />
        <Profesores />

        <div className='Botones'>
            <Boton />
            <Boton2 />
        </div>
        </>
    );
}

export default ProfesoresLista