import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import work from '../components/workout.jpg';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authActions } from '../store/index';

const LoginForm = () => {
  const h1Style = {
    color: '#37474F',
    textAlign: 'center',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });

      if (response.status === 201) {
        dispatch(authActions.login());
        // Login successful, navigate to the home route
        navigate('/exerciselist');
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      setError('Incorrect email or password');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container col-lg-8">
      <div
        className="row"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <img
            src={work}
            className="img-fluid"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            alt="Workout"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: '0 auto',
              maxWidth: '400px',
              padding: '2rem',
            }}
          >
            <h1 style={h1Style}>Login</h1>
            <TextField
              id="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#37474F',
                '&:hover': {
                  bgcolor: '#263238',
                },
              }}
            >
              Login
            </Button>
            <p className='text-center'>Dont have an account <Link  style={{ color: '#00dfc0' }} to='/'>Register? </Link></p>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={5000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity="error"
              >
                {error}
              </MuiAlert>
            </Snackbar>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
