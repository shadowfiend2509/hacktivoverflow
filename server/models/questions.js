const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const QSchema = new Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: [],
  downvotes: [],
  tags: [],
  UserId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: Date,
  views: Number
})

QSchema.pre('save', function (next) {
  this.createdAt = new Date()
  this.upvotes = [];
  this.views = 0;
  this.downvotes = [];
  next()
})

const Question = Mongoose.model('questions',QSchema);


module.exports = Question;