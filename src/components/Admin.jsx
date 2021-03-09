import React, {useEffect, useState} from 'react'
import {auth, db} from '../firebase';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

const Admin = (props) => {
    moment.locale();  
    const [user, setUser] = useState(null);

    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState("");
    const [tareaEditar, setTareaEditar] = useState(null);
    const [editar, setEditar] = useState(false);

    const collectionName = 'tareas-' + auth.currentUser.uid;

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        } else {
            props.history.push('/login');
        }

        const obtenerDatos = async () => {
            try {
                const data = await db.collection(collectionName).get();
                const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setTareas(arrayData);
            } catch (error) {
                console.log(error);
            }
        }

        obtenerDatos();
    }, [props])


    const agregarTarea = async (e) => {
        e.preventDefault()
        
        if(!tarea.trim()) {
          console.log("Vacío")
          return
        }

        try {
            const nuevaTarea = {
                name:tarea,
                fecha:Date.now()
            }
            const data = db.collection(collectionName).add(nuevaTarea)
            setTareas([
                ...tareas,
                {id:data.id, ...nuevaTarea}
            ])
            setTarea("");
        } catch (error) {
          console.log(error);
        }

    }

    const modoEditar = (tarea) => {
        setTareaEditar(tarea);
        setTarea(tarea.name);
        setEditar(!editar);
    }

    const editarTarea = (e) => {
        e.preventDefault()
        
        if(!tarea.trim()) {
          console.log("Vacío")
          return;
        }

        try {
            const tareasArray = tareas.map(t => t.id === tareaEditar.id ? ({id: t.id, name: tarea, fecha: t.fecha}) : t);
            setTareas(tareasArray);

            setTarea("");
            setTareaEditar(null);
            setEditar(false);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTarea = async (id) => {
        try {
            const data = await db.collection('tareas').doc(id).delete();
            const arrayFiltrado = tareas.filter(item => item.id !== id);
            setTareas(arrayFiltrado);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="contenedoruser">
            <h2 className="text-center mb-5">Bienvenido a Tarea App </h2>

            <div className="row mt-2">
                <div className="col-7">
                    <h4 className="text-center">Tus tareas, {user && user.email}</h4>
                    <ul className="list-group">
                        {
                            tareas.map(item =>
                                <li className="list-group-item" key={item.id}>
                                    <span>{item.name + " - " + moment(item.fecha).format("DD/MM/YYYY")}</span>
                                    <button className="btn btn-danger float-end mx-2" onClick={()=>eliminarTarea(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning float-end" onClick={() => modoEditar(item)}>Editar</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col-5">
                <h4 className="text-center">{editar ? "Modificar tarea": "Agregar tareas"}</h4>
                    <form onSubmit={editar ? editarTarea : agregarTarea}>
                        <input type="text" className="form-control mb-2" placeholder="Introduce la tarea" value={tarea} onChange={e=>setTarea(e.target.value)}/>
                        {
                            editar ? (<button className="btn btn-warning w-100">Editar</button>) : 
                            (<button className="btn btn-dark w-100">Agregar</button>)
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Admin)
