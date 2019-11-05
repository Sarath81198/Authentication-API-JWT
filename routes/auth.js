const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken');

//API response
router.post('/register' , async (req, res) => {

    //validating the response
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }

    //Check the user is already in the db
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists){
        return res.status(400).send('Email already exists');
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        try {
            const savedUser = await user.save();
            res.send({ user: user._id });
        } catch (error) {
            res.status(400).send(err);
        }  
})


//Login

router.post('/login', async (req, res) => {
    //validation
    const { error } =loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //check if the email is already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is incorrect');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //check if password is correct
    if(!validPassword) {
        return res.status(400).send('Password is incorrect');
    }
    //create and assign a token
    const token = jwt.sign({_id: user._id}, 'secretKey');
    res.header('auth-token', token).send(token);

    res.send('Logged in')
})


module.exports = router;