const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const {isValidEmail} = require('../middleware/UserValidation');
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/register

exports.registerUser = async(req, res) => {
    try{
        const {username, email,password, repeatPassword} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
        return res.status(400).json({ msg: 'you have already registred'})

        if(!isValidEmail(email)){
            return res.status(400).json({ msg: 'Invalid email address format.'});
        
        }

        if (password.length<8 ||!/[A-Z]/.test(password)){
            return res.status(400).json({ msg: 'Password at least 8 characters long, and contain at least one capital letter.'});

        }

        if (password !== repeatPassword){
            return res.status(400).json({ 
                status:'error',
                msg: 'Password do not match.'});
        }



        
        const hashedPassword = await bcrypt.hash(password,10);
        let user = await User.create({username, email, password: hashedPassword, role});
        return res.status(201).json({
            status:'success',
            data:{
                user: user,
            }
        });

    }catch (err){
        console.log(err.message);
        return res.status(500).json({
            status:'error',
            message: err.message
        });
    }
};

// @desc    Login an existing user
// @route   POST /api/login
exports.loginUser = async(req, res) =>{
    const {email, password}= req.body;
    const user = await User.findOne({ email });

    if (!user){
        return res.status(400).json({
            status:'error',
            message: 'Invalid Email or Password!'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({
            status:'error',
            message:'Email or Password not matched!'
        });
    }

    

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'24h'});
    res.json({
        status:"success",
        result:{
            token: token,
            userId: user._id
        },
        message: "Logged in Successfully"
    });
};