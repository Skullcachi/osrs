import React from 'react';
import './App.css';
import Application from "./components/Application";
/* import { ToastContainer } from "react-toastify"; */
/* import 'react-toastify/dist/ReactToastify.css' */
/* import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField, Container } from '@material-ui/core'; */

import UserProvider from "./providers/UserProvider";
function App() {
  return (
      <UserProvider>
        <Application />
      </UserProvider>
  );
}

export default App;
