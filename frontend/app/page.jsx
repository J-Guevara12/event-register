"use client"
import './globals.css'

import * as React from 'react'


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLogin } from "./hooks/useLogin.js"
import {AuthContext} from './context/AuthContext';
import WindowContainer from './components/WindowContainer';




export default function SignIn() {

  const [showPassword,setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const [emailError,setEmailError] = React.useState({enabled: false, message: ""});
  const [passwordError,setPasswordError] = React.useState({enabled: false, message: ""})

  const ValidateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const [ setUser] = React.useContext(AuthContext)

  const loginFunction = useLogin(setUser)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    if(!ValidateEmail(data.get('email'))){
      setEmailError(() => {return {
        enabled: true, 
        message: "Formato de Email no válido"}
      })
      return
    }
    if(!data.get('password')){
      setPasswordError(() => {return {
        enabled: true, 
        message: "Campo obligatorio"}
      })
      return
    }
    loginFunction(data.get('email'),data.get('password'))
      .catch((err) => {
        if(err.response.status == 401){
          setEmailError(() => {return {
            enabled: true, 
            message: "Email o contraseña incorrectos"}
          })}
        else{
          throw(err)
        }})
  };

  return (
    <WindowContainer size="sm">
            <Avatar sx={{ p: 3.5, m: 1, bgcolor:  'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Inicio de sesión 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={emailError.enabled}
              helperText={emailError.message}
              onChange={() => {
                setEmailError(()=>{return {enabled: false, message: ""}})}
              }
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl 
              margin="normal" 
              sx={{width: '100%'}} 
              variant='outlined'>
              
              <InputLabel 
                error={passwordError.enabled} htmlFor="outlined-adornment-password">
                Contraseña*
              </InputLabel>

              <OutlinedInput
                type={showPassword? 'text' : 'password'}
                required
                fullWidth
                error={passwordError.enabled}
                onChange={() => {
                  setPasswordError(()=>{return {enabled: false, message: ""}})}
                }
                name="password"
                id="outlined-adornment-password"
                autoComplete="current-password"
                label="Contraseña"

                endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword? <VisibilityOff/> : <Visibility/> }

                  </IconButton>
                </InputAdornment>
                }
              />
              {passwordError? 
              <FormHelperText 
              error={passwordError.enabled}>{passwordError.message}
              </FormHelperText>
              :null}
              
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'#e8ebfc' }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link href="sign-up" variant="body2">
                  {"No tienes cuenta? Crea una"}
                </Link>
              </Grid>
            </Grid>
          </Box>
    </WindowContainer>
  );
}
