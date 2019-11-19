const Route = require('express').Router();
const { findAll,findByTag,findOneQuestion,findQuestionUser,searchTitle,updateDownVote,updateQuestion,updateUpVote,deleteQuestion,create } = require('../controllers/questionController');
const { authentication, authorizationQuestion } = require('../middlewares/auth');

Route.get('/', findAll);

Route.get('/profile', authentication, findQuestionUser);
Route.get('/search/:id', findOneQuestion);
Route.get('/search/tags/:name', findByTag);
Route.get('/find/:name', searchTitle);

Route.put('/:id', authentication, authorizationQuestion, updateQuestion);
Route.post('/ask', authentication, create);

Route.patch('/up', authentication, updateUpVote);
Route.patch('/down', authentication, updateDownVote);

Route.delete('/:id', authentication, authorizationQuestion, deleteQuestion)

module.exports = Route;