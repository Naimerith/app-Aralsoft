import React, { useEffect, useState } from "react";
import ButtonApp from "../components/ButtonApp";
import CreateReport from "../views/CreateReport";
import { alertSuccess, alertError } from "../Functions/sweetAlert";
import "../assets/styles/Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handlebtn = () => {
    if (user && pwd) {
      setSuccess(true);
      alertSuccess("Haz iniciado sesión");
    } else {
      setSuccess(false);
      alertError("Los datos ingresados son incorrectos");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      {success ? (
        <CreateReport></CreateReport>
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
