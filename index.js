const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to db
mongoose.connect(
    'mongodb+srv://sarathdev:sarathdev@cluster0-b1mvc.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    ()=>console.log("Connected to db")
    );

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, ()=>console.log('Server is running'));