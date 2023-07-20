import React, { useState } from "react";
import {Box, TextField, Typography,Button} from '@mui/material'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authActions } from "../store";

const Auth=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [inputs,setInputs]=useState({
        name:"",email:"",password:""
    })
    const [error, setError] = useState('');
    const [isSignup,setIsSignup]=useState(false);
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const sendRequest = async (type = "login") => {
        try {
          const res = await axios.post(`http://localhost:3000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
          });
      
          const data = await res.data;
         
          return data;


        } catch (err) {
          console.log(err);
          return { error: err.message };
        }
      };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        if(isSignup){
          
            sendRequest('signup').then(()=>dispatch(authActions.login()))
            .then(()=>{ if(dispatch(authActions.login())==true){
                window.location.href = '/auth'
            }}
)  
        }
        else{
              sendRequest().then(()=>dispatch(authActions.login())).then(()=>navigate('/')).then(data=>
                console.log(data)
            )
        }
    }
    return <div>
        <form onSubmit={handleSubmit}>
           <Box display="flex" flexDirection={'column'} alignItems='center' justifyContent='center' boxShadow="10px 10px 20px #ccc" padding={3}
           margin='auto'
           marginTop={5}
           borderRadius={5}
           maxWidth={400}>
            <Typography variant="h2" padding={3} textAlign="center">
                {isSignup ? "Signup" : "Login"}
            </Typography>
            {error && <p>{error}</p>}
           {isSignup && <TextField
           onChange={handleChange}
           name="name"
           placeholder="Name" value={inputs.name} margin="normal"/>} 
            <TextField name="email" onChange={handleChange} placeholder="Email" value={inputs.email} type={'email'} margin="normal"/>
            <TextField name="password" onChange={handleChange} placeholder="Password" value={inputs.password} type={'password'} margin="normal"/>
            <Button type="submit" variant="contained" color="warning" sx={{borderRadius:3,marginTop:3}}>Submit
            </Button>
            <Button sx={{borderRadius:3,marginTop:3}} onClick={()=>setIsSignup(!isSignup)}>Change to {isSignup?"Login" : "Signup"}</Button>

           </Box>
        </form>

    </div>
}
export default Auth;