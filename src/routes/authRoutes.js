const Router = require('express');
const Authrouter = Router();
const {registerUser, LoginUser} = require('../controllers/authContollers');

Authrouter.post('/register', registerUser);
Authrouter.post('/login', LoginUser);

module.exports = Authrouter;