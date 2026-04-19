const Router = require('express');
const Authrouter = Router();
const {registerUser, LoginUser, LogoutUser} = require('../controllers/authContollers');

Authrouter.post('/register', registerUser);
Authrouter.post('/login', LoginUser);
Authrouter.get('/logout', LogoutUser );

module.exports = Authrouter;