"use client"
import '../globals.css'

import * as React from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';

import { Avatar, Button, TextField, Link, Grid, Box, Typography } from '@mui/material'
import { FormControl, IconButton, FormHelperText, InputAdornment } from '@mui/material'
import { OutlinedInput, InputLabel } from '@mui/material'

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import WindowContainer from '../components/WindowContainer';

export default function SignUp() {
  const router = useRouter();

  const [showPassword,setShowPassword] = React.useState(false);

  const [emailError,setEmailError] = React.useState({enabled: false, message: ""});
  const [nameError,setNameError] = React.useState({enabled: false, message: ""});
  const [passwordError,setPasswordError] = React.useState({enabled: false, message: ""})

  const ValidateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    
    // Checks if all fields have value
    if(!ValidateEmail(data.get('email'))){
      setEmailError(() => {return {
        enabled: true, 
        message: "Formato de Email no válido"}
      })
      return
    }
    if(!data.get('name')){
      setNameError(() => {return {
        enabled: true, 
        message: "Campo obligatorio"}
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

    axios.post("/api/signup",{
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    })
      .then((res) =>{
        if(res.status === 201){
          router.push("/")
        }
      })
      .catch((err) => {
        if(err.request.status===410){
          setEmailError(() => {return {
            enabled: true, 
            message: "La dirección de correo ya se encuentra registrada"}
          })
        }
        else{
          throw(err)
        }
      })
  };


  return (
    <WindowContainer size="sm">
      <Avatar sx={{ p: 3.5, m: 1, bgcolor:  'primary.main' }}>
          <PersonAddOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Creación de cuenta
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre"
          name="name"
          error={nameError.enabled}
          helperText={nameError.message}
          onChange={() => {
            setNameError(()=>{return {enabled: false, message: ""}})}
          }
          autoFocus
        />
        <FormControl 
          margin="normal" 
          sx={{width: '100%'}} 
          variant='outlined'>
          
          <InputLabel error={passwordError.enabled} htmlFor="outlined-adornment-password">
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
          Crea tu cuenta
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/" variant="body2">
              {"Ya tienes cuenta? Inicia sesión"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </WindowContainer>
  );
}
