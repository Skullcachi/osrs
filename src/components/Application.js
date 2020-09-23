import React from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import Registro from "./Registro";
import Perfil from "./Perfil";
function Application() {
  const user = null;
  return (
        user ?
        <Perfil />
      :
        <Router>
          <Login path="login" />
          <Registro path="registro" />
          <Perfil path="perfil" />
          <Login path="/" />
        </Router>

  );
}
export default Application;