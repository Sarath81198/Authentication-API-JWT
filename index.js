const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to db
mongoose.connect(
    'mongodb+srv://admin:akkzBTYu9Ir4p9nF@pets-app-kyhbw.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    ()=>console.log("Connected to db")
    );

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Middleware
app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, ()=>console.log('Server is running'));