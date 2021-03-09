import React, {useState} from 'react';
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';

const Reset = (props) => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const validarDatos = e => {
        e.preventDefault()
        if(!email.trim()) {
            setError("Escribe un email")
          return
        }
        setError(null)

        recuperarContraseña()
    }

    const recuperarContraseña = async () => {
            try {
                await auth.sendPasswordResetEmail(email)
                props.history.push('/login')
                
            } catch (error) {
                setError(error.message)            
            }
    }

    return (
        <div className="formrecuperar">
            <h3 className="text-center">Recupera tu cuenta</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={(e) => validarDatos(e)}>

                        {error && <span className="alert-danger w-100 mb-2">{error}</span>}

                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Introduce tu email, para la recuperación." name="registro" id="registro" value={email}/>

                        <button className="btn btn-large btn-dark w-100 mb-2">Enviar</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
