import '../App.css'
import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function Profesores(){

    const [datos, setDatos] = useState([]); //Guardamos el estado que viene del backend. datos = donde se guardan los datos del array. setDatos = funcion para actualizar datos
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = (e) => {
        setScrolled(e.target.scrollTop > 0);
    };

    useEffect(() => {
        fetch("http://localhost/backend/obtenerDatos.php") //Hace una peticion al backend.
            .then(res => res.json()) //Convierte la respuesta en un archivo JOTASON
            .then(json => {
                setDatos(json); //Guarda los datos json en el estado actual y renderiza el componente.
            })
            .catch(err => console.error(err)); //Error en consola por si falla.
    }, []);

    //Definicion de columnas y datos que se muestran
    const columns = [
        {
            header: "Nombre", //Nombre que aparecera en la tabla. Puede ser cualquiera.
            accessorKey: 'nombre' //Nombre que tiene la columna en la base de datos. (Es decir, si la columna que almacena el dato 'nombre' se llama 'nombreUsuario' , debe colocarse este último)
        },
        {
            header: "Especialidad",
            accessorKey: 'especialidad'
        }
        //Si la tabla tiene varias columnas pero solo quieren mostrarse unas cuantas, puede hacerse solo colocando las que se quieren mostrar. 
    ]

    //Crea la tabla
    const tabla = useReactTable({
        data: datos, //Datos que vienen del backend
        columns, //Columnas definidas
        getCoreRowModel: getCoreRowModel(), 
    });


    return(
        <div>
            <div className='tablaCon'>
            <div className='scroll' onScroll={handleScroll}>
            <table className={scrolled ? "scrolled" : ""}>
                <thead>
                    {tabla.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {tabla.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default Profesores