import React, { useState } from 'react';
import { Link, useNavigate } from "@reach/router";

import { auth } from "../firebase";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
/* import FormControlLabel from '@material-ui/core/FormControlLabel'; */
/* import Checkbox from '@material-ui/core/Checkbox'; */
/* import Link from '@material-ui/core/Link'; */
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../images/osrs.jpg';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        SM Webhosting &nbsp;
      {/* <Link color="inherit" href="https://material-ui.com/">
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    /* backgroundImage: 'url(https://source.unsplash.com/random)', */
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then( res => {
            navigate('perfil', { replace: true });
        }).catch(error => {
          setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="Correo Electrónico"
              name="userEmail"
              value={email}
              autoComplete="email"
              autoFocus
              onChange = {(event) => onChangeHandler(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Contraseña"
              type="password"
              id="userPassword"
              value={password}
              autoComplete="current-password"
              onChange = {(event) => onChangeHandler(event)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
            >
              Iniciar Sesión
            </Button>
            <Grid container justify="center">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                {/* <Link className="text-center" href="registro" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <Link to="/registro" className="text-blue-500 hover:text-blue-600">
                    Regístrate aquí
                </Link>{" "}
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}