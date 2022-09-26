import React, { useRef, useEffect, useState } from 'react';
import '../assets/styles/Login.css';


const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); //capturar errores en el login
  const [success, setSuccess] = useState(false); //Mensaje de exito cuando inicie sesion



  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ user, pwd });
    setUser('');
    setPwd('');
    setSuccess(true);

  }

  return (
    <>
      {success ? (
        <section className='signInSuccessful '>
          <h1>Haz iniciado sesión satisfactoriamente</h1>
          <br />
          <p>
            <a href="./new-report">Crear un Reporte</a>
          </p>
        </section>

      ) : (

        <div className='signIn'>
          <p ref={errRef} className={errorMsg ? 'errorMsg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <br />
            <br />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <br />
            <br />

            <button>Iniciar Sesión</button>

            <p>Si no tiene acceso comunicarse con el administrador</p>

          </form>
        </div>
      )}
    </>
  )
}


export default Login;