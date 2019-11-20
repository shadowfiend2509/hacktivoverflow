const Answer = require('../models/answer');
const mongoose = require('mongoose')


module.exports = {
  findId (req,res,next) {
    const QuestionId = req.params.id;
    Answer.find({ QuestionId }).populate('UserId')
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err=>{
        next(err);
      })
  },
  findAnswerUser (req,res,next) {
    const UserId = new mongoose.Types.ObjectId(req.loggedUser.id);
    Answer.find({ UserId }).populate('QuestionId')
      .then(answers => {
      res.status(200).json(answers)
      })
      .catch(next)
  },
  create (req,res,next) {
    const UserId = req.loggedUser.id;
    const QuestionId = req.params.id;
    const { response } = req.body;
    Answer.create({ response, QuestionId, UserId })
      .then(data => {
        res.status(201).json({ data, msg: 'Successfully Created!' })
      })
      .catch(next)
  },
  updateUpAnswer (req,res,next) {
    const _id = req.body.id
    const id = req.loggedUser.id //userid
    Answer.findById({_id})
      .then(answer => {
        let pass = true;
        answer.upvotes.forEach((el, i) => {
          if(el == id) pass = false
        })
        let passUp = true
        answer.downvotes.forEach((el, i) => {
          if(el == id) passUp = false
        })
        if(!pass) throw {msg: 'downspam'}
        else if(!passUp) {
          return Answer.findByIdAndUpdate(_id, {$pull: {downvotes: id}})
        } else {
          return Answer.findByIdAndUpdate({_id},{$push:{"upvotes": id}})
        }
      })
      .then(success => {
        res.status(200).json(success)
      })
      .catch(next)
  },
  updateDownVote (req,res,next) {
    const _id = req.body.id
    const id = req.loggedUser.id //userid
    Answer.findById({_id})
      .then(answer => {
        let pass = true;
        answer.downvotes.forEach((el, i) => {
          if(el == id) pass = false
        })
        let passUp = true
        answer.upvotes.forEach((el, i) => {
          if(el == id) passUp = false
        })
        if(!pass) throw {msg: 'downspam'}
        else if(!passUp) {
          return Answer.findByIdAndUpdate(_id, {$pull: {upvotes: id}})
        } else {
          return Answer.findByIdAndUpdate({_id},{$push:{"downvotes": id}})
        }
      })
      .then(success => {
      res.status(200).json(success)
      })
      .catch(next)
  }
}