const Route = require('express').Router();
const { findOneUserforState,login,register } = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, findOneUserforState);
Route.post('/login', login);
Route.post('/register', register);

module.exports = Route;