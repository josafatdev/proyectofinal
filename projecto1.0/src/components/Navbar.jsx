import '../App.css'
import Ham from '../assets/Ham.png';
import Back from '../assets/Back.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar(){

    const atraso = useNavigate();

    return(
        <div>
            <nav>
                <div className='HamburguesaIMG'>
                    <img src={Ham} alt="Menú" />
                </div>

                <div className='AtrasIMG' onClick={() => atraso(-1)}>
                    <img src={Back} alt="Atrás" />
                </div>
            </nav>
        </div>
    );
}

export default Navbar