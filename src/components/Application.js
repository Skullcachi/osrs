import React from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import Registro from "./Registro";
import Hiscores from "./hiscores/Hiscores";
import History from "./history/History";
function Application() {
  const user = null;
  return (
        user ?
        <Hiscores />
      :
        <Router>
          <Login path="/login" />
          <Registro path="/registro" />
          <Hiscores path="/perfil" />
          <History path="/history" />
          <Login path="/" />
        </Router>

  );
}
export default Application;