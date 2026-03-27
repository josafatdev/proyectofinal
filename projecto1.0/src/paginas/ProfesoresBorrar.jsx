import '../App.css'
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import ProfesoresEliminados from '../components/ProfesoresEliminados';
import Boton3 from '../components/Boton3';

function ProfesoresBorrar(){

    const [datos, setDatos] = useState([]);  //Guardamos el estado que viene del backend. datos = donde se guardan los datos del array. setDatos = funcion para actualizar datos
    const [rowSelection, setRowSelection] = useState([]);

    useEffect(() => {
        fetch("http://localhost/backend/obtenerDatos.php") //Hace una peticion al backend.
            .then(res => res.json()) //Convierte la respuesta en un archivo JOTASON
            .then(json => {
                setDatos(json); //Guarda los datos json en el estado actual y renderiza el componente.
            })
            .catch(err => console.error(err)); //Error en consola por si falla.
    }, []);

    const eliminarID = () => {
        const ids = Object.keys(rowSelection);

        if (ids.length === 0){
            alert("No hay registros seleccionados");
            return;
        }

        fetch("http://localhost/backend/eliminarProfe.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ids})
        })
        .then(res => res.json())
        .then(() => {
            //Actualizar la tabla sin recargar la página
            setDatos(prev => prev.filter(item => !ids.includes(item.id.toString())));

            //Limpiar Seleccion
            setRowSelection({});
        })
        .catch(err => console.error(err));

    };

    return(
        <>
        <Navbar />
        <ProfesoresEliminados 
            datos={datos}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
        />

        <div className='Botones'>
            <Boton3 
                onEliminar={eliminarID}
                disabled={Object.keys(rowSelection).length === 0}
            />
        </div>
        </>
    );
}

export default ProfesoresBorrar