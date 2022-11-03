import React, { useRef, useEffect, useState } from "react";
import ButtonApp from "../components/ButtonApp";
import { postData } from "../services/api_aralsoft";
import "../assets/styles/Login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); //capturar errores en el login
  const [success, setSuccess] = useState(false); //Mensaje de exito cuando inicie sesion

  const handleChange = async (e) => {
    e.preventDefault();
    console.log({ user, pwd });
    setUser("");
    setPwd("");
    setSuccess(true);
    //const hola = await postData();
    //console.log("111111111111", hola);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd]);
  return (
    <div>
      {success ? (
        <section className="signInSuccessful ">
          <h1>Haz iniciado sesión satisfactoriamente</h1>
          <br />
          <p>
            <a href="./new-report">Crear un Reporte</a>
          </p>
        </section>
      ) : (
        <div className="containerLogin">
          <p
            ref={errRef}
            className={errorMsg ? "errorMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMsg}
          </p>
          <h3>Login</h3>
          <form className="formLogin" onSubmit={handleChange}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="empresa"
              autoComplete="off"
              required
              placeholder="empresa"
              name="empresa"
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="contraseña"
              required
              name="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <div className="buttonLogin">
              <ButtonApp name="Ingresar " />
            </div>
            <p className="notification">
              Si no tiene acceso comunicarse con el administrador
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
