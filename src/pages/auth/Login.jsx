import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevenir o envio do formulário

    var data = {
      'username': username,
      'password': password
    }

    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('http://54.94.34.148:8000/v1/auth/login/', config);
      console.log(response);

      if (response.status === 401) {
        enqueueSnackbar('Credenciais inválidas', { variant: 'error', autoHideDuration: 2000 });
        return;
      }

      const result_auth = await response.json();

      enqueueSnackbar('Login successful', { variant: 'success', autoHideDuration: 2000 });
      const token = result_auth.access_token;
      console.log(token);
      Cookies.set('auth_cookie', token);
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Falha no login' + error, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{  
        marginTop: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Scala System 
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="Username"
          autoComplete="Username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  </Container>
  )
}

export default Login;
