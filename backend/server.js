const express = require('express');
const cors= require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDb database connection established successfully")
})


const exercisesRouter= require('./routes/exercises');
const usersRouter= require('./routes/users');
const namesRouter = require('./routes/user-routes');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);
app.use('/api/user',namesRouter);
 
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});