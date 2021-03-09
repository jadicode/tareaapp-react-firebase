import React, {useState} from 'react';
import {db, auth} from '../firebase';
import {withRouter} from 'react-router-dom';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [modoRegistro, setModoRegistro] = useState(false);

    const validarDatos = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("El email está vacío.");
            return;
        }
    
        if (pass.length < 6) {
            setError("La contraseña tiene que tener al menos 6 caracteres.");
            return;
        }
        
        if (modoRegistro) {
            registrar();
        } else {
            login();
        }
    }

    const login = async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            setEmail("");
            setPass("");
            setError("");
            props.history.push('/admin')
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setError("Email no válido");
            } else {
                setError("Usuario o constraseña inválido")
            }
        }
    }

    const registrar = async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);

            await db.collection('usuarios').doc(email).set({email: res.user.email, uid: res.user.uid});

            setEmail("");
            setPass("");
            setError("");
            props.history.push('/admin');
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setError("Email no válido");
            } else if (error.code === "auth/email-already-in-use") {
                setError("Email ya en uso");
            }
        }
    }

    return (
        <div className="iniciosesion">
            <h3 className="text-center">{modoRegistro? "Registro": "Inicia sesión"}</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={(e) => validarDatos(e)}>

                        {error && <span className="alert-danger w-100 mb-2">{error}</span>}

                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Introduce tu email." name="registro" id="registro" value={email}/>

                        <input type="password" className="form-control mb-2" onChange={(e) => setPass(e.target.value)} placeholder="Introduce tu contraseña." name="pass" id="pass" value={pass}/>
                        
                        <button className="btn btn-large btn-dark w-100 mb-2">{modoRegistro? "Registro": "Inicia Sesión"}</button>
                        <button type="button" onClick={() => setModoRegistro(!modoRegistro)} className="btn btn-large btn-info w-100 mb-2">{modoRegistro? "¿Tienes cuenta?": "Regístrate"}</button>
                        {
                        !modoRegistro && (
                            <button 
                                className="btn btn-danger w-100 mb-2"
                                type="button"
                                onClick={()=>props.history.push('/reset')}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
