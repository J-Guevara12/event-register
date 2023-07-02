"use client"
import './globals.css'
import theme from './theme'

import * as React from 'react'


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import { useLogin } from "./hooks/useLogin.js"



export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const loginF = useLogin()
    console.log(loginF.login(data.get('email'),data.get('password')))


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box>
          <Paper
            elevation={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              pt:5,
              px:10,
              py: 5,
            }}>

          <Avatar sx={{ m: 1, bgcolor:  'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Iniciar sesión 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
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
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"No tienes cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
