const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } =require('../helpers/jwt');
const cron = require("node-cron");


module.exports = {
  findOneUserforState (req,res,next) {
  User.findById(req.loggedUser.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
  },
  login (req,res,next) {
  const { request, password } = req.body;
  console.log(req.body)
  if(request && password) {
    User.findOne({ $or: [{username: request}, {email: request}] })
      .then(user => {
        if(user && comparePassword(password, user.password)){
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email
          };
          const serverToken = signToken(payload);
          res.status(200).json({ token: serverToken, user })
        } else {
          throw { status: 403, msg: 'wrong' }
        }
      })
      .catch(next)
  }else{
    throw { status: 404, msg: 'annon' }
  }
 },
 register (req,res,next) {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(data => {
      const payload = { 
        id: data._id,
        username: data.username,
        email: data.email
       };
      const serverToken = signToken(payload);
      res.status(201).json({ token: serverToken, msg: 'Success Register', data })
    })
    .catch(err=>{
      next(err)
    })
 }
}