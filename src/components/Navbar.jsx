import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase';

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut().then(props.history.push("/login"))
    }

    return (
        <div className="navbar navbar-dark mt-5" id="agregacionav">
            <Link to="/" className="navbar-brand mx-2"> <img src="https://us.123rf.com/450wm/vladvm/vladvm1611/vladvm161100588/69686878-icono-de-bloc-de-notas-dise%C3%B1o-del-vector-diario-y-cuaderno-de-dibujo-s%C3%ADmbolo-notebook-web-gr%C3%A1fico-jpg-ai-ap.jpg?ver=6" alt="Tarea App" width="50"/> Tarea App</Link>
            <div className="d-flex">
                <NavLink to="/" exact className="btn btn-dark mr-2">Inicio</NavLink>
                {
                    props.user !== null ?
                    <NavLink to="/admin" className="btn btn-dark mr-2">Tareas</NavLink> :
                    null
                }  
                
                {
                    props.user === null ?
                    (<NavLink to="/login" className="btn btn-dark mr-2">Iniciar Sesión</NavLink>) :
                    (<Link to="/login" className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>Cerrar Sesión</Link>)
                }

            </div>
        </div>
    )
}

export default withRouter(Navbar)
