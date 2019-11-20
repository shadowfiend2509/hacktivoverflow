const Route = require('express').Router();
const { findAll,findByTag,findOneQuestion,findQuestionUser,searchTitle,updateDownVote,updateQuestion,updateUpVote,deleteQuestion,create, findByWatchTag, findAllTag } = require('../controllers/questionController');
const { authentication, authorizationQuestion } = require('../middlewares/auth');

Route.get('/', findAll);

Route.get('/search/:id', findOneQuestion);
Route.get('/find/tags', findAllTag);
Route.get('/search/tags/:name', findByTag);
Route.get('/find/:name', searchTitle);


Route.use(authentication)
Route.get('/profile', findQuestionUser);
Route.get('/watchTag',findByWatchTag);
Route.put('/:id', authorizationQuestion, updateQuestion);
Route.post('/ask', create);

Route.patch('/up', updateUpVote);
Route.patch('/down', updateDownVote);

Route.delete('/:id', authorizationQuestion, deleteQuestion)

module.exports = Route;