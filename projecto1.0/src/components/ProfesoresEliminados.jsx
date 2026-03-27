import '../App.css'
import { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function ProfesoresEliminados({datos, rowSelection, setRowSelection}){

    const [scrolled, setScrolled] = useState(false);

    const handleScroll = (e) => {
        setScrolled(e.target.scrollTop > 0);
    };

    //Definicion de columnas y datos que se muestran
    const columns = [
        {
            id: 'select',
            header: ({table}) => (
                <input 
                    type='checkbox'
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({row}) => (
                <input 
                    type='checkbox'
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />                
            )
        },
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

        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        },

        getRowId: row => row.id
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

export default ProfesoresEliminados