const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        res.status(400);
        throw new Error('Both the Username and Password fields need to be filled');
    }

    const userExist = await Users.findOne({username});

    if(userExist){
        res.status(400);
        throw new Error('User Already exists');
    }

    const salt = await Users.findOne({ username });
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
        userName,
        email,
        password: hashedPassword,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        res.status(400);
        throw new Error('Both the Username and Password fields need to be filled');
    }

    const user = await Users.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWR_SECRET, {
        expiresIn: '30d',
    });
}
module.exports  = {
    registerUser,
    loginUser,
    getMe,
}