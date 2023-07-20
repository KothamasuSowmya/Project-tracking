import React, { Component } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography,InputLabel } from "@mui/material";


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    console.log(user);

    axios
      .post("http://localhost:3000/users/add", user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    this.setState({ username: "" });
  }

  render() {
    return (
   
<div className="container col-lg-10">
<div> <h2  className="text-center mt-5 me-5 ms-5">This is <span style={{color:"#00dfc0"}}>Create User</span> space</h2>
        <p className="text-secondary text-center mb-5 mt-4">Here you can create as many users as you want  and the users <br></br> will be shown in dropdown menu in create users page. Please fell free to create all the users you want!!</p></div>
<Box
        sx={{
          maxWidth:'800px',
         
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="container"
          component="form"
          onSubmit={this.onSubmit}
        
        >
        <InputLabel htmlFor="username" className="pe-2 pb-2">You can add users here :</InputLabel>
          <TextField
            label="Username"
            type="text"
            required
            fullWidth
            value={this.state.username}
            onChange={this.onChangeUsername}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="left">
          <Button type="submit" variant="contained" color="primary" sx={{
                bgcolor: '#00dfc0',
                '&:hover': {
                  bgcolor: '#263238',
                },
              }}>
            Create user
          </Button>
        </Box>
        </Box></div>

       
     
    );
  }
}
