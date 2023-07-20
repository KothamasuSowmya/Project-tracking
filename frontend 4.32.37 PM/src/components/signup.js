import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import work from '../components/workout.jpg'
import {Link} from 'react-router-dom'
const SignupForm = () => {
  const h1Style = {
    color: '#37474F',
    textAlign: 'center',
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        // Error response from the server
        if (error.response.status === 404) {
          setError(error.response.data.message);
        } else {
          console.error(error); // Handle other server errors if needed
        }
      } else if (error.request) {
        // Network error
        console.error('Network Error:', error.message);
      } else {
        console.error(error); // Other errors
      }
      setSnackbarOpen(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div class="container col-lg-8 ">
    <div class="row "style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
      <div className='col-lg-6 col-md-6 col-sm-12 '><img src={work} class="img-fluid " style={{
      maxWidth: '100%',
      height: 'auto',
    }}></img></div>
      <div className='col-lg-6 col-md-6 col-sm-12 '>
        
      <Box
   
   component="form"
   onSubmit={handleSignup}
   sx={{
     display: 'flex',
     flexDirection: 'column',
     gap: '1rem',
     maxWidth: '500px',
     margin: '0 auto',
     padding: '2rem',
    
   }}
 >
   <Snackbar
     open={snackbarOpen}
     autoHideDuration={5000}
     onClose={handleSnackbarClose}
     anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the Snackbar at the top center
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
   <h1 style={h1Style}>Signup</h1>
   <TextField
     id="name"
     label="Name"
     placeholder="Name"
     value={name}
     onChange={(e) => setName(e.target.value)}
     required
   />
  
   <TextField
     id="email"
     label="Email"
     placeholder="Email"
     type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     required
   />
   <TextField
     id="password"
     label="Password"
     placeholder="Password"
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
   <TextField
     id="confirm-password"
     label="Confirm Password"
     placeholder="Confirm Password"
     type={showConfirmPassword ? 'text' : 'password'}
     value={confirmPassword}
     onChange={(e) => setConfirmPassword(e.target.value)}
     required
     InputProps={{
       endAdornment: (
         <InputAdornment position="end">
           <IconButton
             onClick={handleToggleConfirmPasswordVisibility}
             edge="end"
             aria-label="toggle confirm password visibility"
           >
             {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
           </IconButton>
         </InputAdornment>
       ),
     }}
   />
   

   <Button type="submit" variant="contained" color="primary" sx={{
    bgcolor: '#37474F',
    '&:hover': {
      bgcolor: '#263238',
    },
  }}>
     Signup
   </Button>
   <p className='text-center'>Already have an account <Link  style={{ color: '#00dfc0' }} to='/login'>Login? </Link></p>
   
 </Box></div>
    </div>
  </div>
    
  );
};

export default SignupForm;
