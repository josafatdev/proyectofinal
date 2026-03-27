import '../App.css'
import Navbar from '../components/Navbar';

function Estudiantes() {
    
    return (

        <div>
            <Navbar />
        <div className="cajitaTux">

            {/* TABLA */}
            <div className="tablaCarda">
                <div className='tablaContenido'>

                {/* Encabezado*/}
                <div className="encabezado">
                    <div>Nombre del Estudiante</div>
                    <div>NIE</div>
                    <div>Estado</div>
                </div>
                {/* Filas */}
                <div className="filas">

                    <div>Gabriel Alfaro</div>
                    <div>5358802</div>
                    <div>
                    <button className='btone'>Ver información del Estudiante</button>
                    </div>
                </div>

                <div className="filas">
                    <div>Jorge Josafat</div>
                    <div>4367390</div>
                    <div>
                        <button className='btone'>Ver información del Estudiante</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Estudiantes;