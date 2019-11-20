const Route = require('express').Router();
const { findOneUserforState,login,register,viewUserProfile, updateMedal, addToWatchTag } = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, findOneUserforState);
Route.get('/:id', authentication, viewUserProfile);
Route.patch('/add/watch', authentication, addToWatchTag);
Route.patch('/medal/:id', authentication, updateMedal);
Route.post('/login', login);
Route.post('/register', register);

module.exports = Route;

//MONGODB_URL="mongodb+srv://ericsudhartio:shadowfiend2509@cluster0-o92dt.mongodb.net/hacktivoverflow?retryWrites=true&w=majority"