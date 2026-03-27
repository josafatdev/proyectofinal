import '../App.css'

function CuadroHistorial() {
    return (
        <div className="fila-superior">
            <div className="actividad">
                <h4>1. Comer en clase</h4>
                <p>El estudiante estaba comiendo pupusas de frijol con queso mientras sus compañeros estaban exponiendo.</p>

                <span className="fecha">26 de marzo del 2026, 09:44</span>
                <p className="maestro">Maestro responsable del reporte: Franklin David Barahona Lopéz</p>                
            </div>

            <div className="acciones">
                <h4>Acciones Correctivas</h4>
                <ul>
                    <li>Recoger el polvo de la cancha</li>
                    <li>Comprar pupusas para todo el grado.</li>
                </ul>

                <div className="check">
                    <label>Completado</label>
                    <input type="checkbox" checked readOnly> </input>
                </div>
            </div>
        </div>
    );
}

export default CuadroHistorial;