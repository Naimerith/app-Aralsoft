import React, { useState } from "react";
import ButtonApp from "../components/ButtonApp";
import { postData } from "../services/api_aralsoft";
import { useNavigate } from "react-router-dom";

import "../assets/styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false); //Mensaje de exito cuando inicie sesion

  const handleChange = (e) => {
    e.preventDefault();
    //console.log({ user, pwd });
  };

  const handlebtn = () => {
    console.log("enviado");
    if (user === "63" && pwd === "s3cr3t0") {
      postData();
      setSuccess(true);
      navigate("/new-report");
    } else {
      console.log("hubo un error");
      setSuccess(false);
    }
  };

  return (
    <div>
      {success ? (
        <h5>Haz iniciado sesión correctamente</h5>
      ) : (
        <div className="containerLogin">
          <h3>Login</h3>
          <form className="formLogin" onSubmit={handleChange}>
            <input
              type="text"
              id="empresa"
              autoComplete="off"
              required
              placeholder="empresa"
              name="empresa"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
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
              <ButtonApp name="Ingresar " onClick={handlebtn} />
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
