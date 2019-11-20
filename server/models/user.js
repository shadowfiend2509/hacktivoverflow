const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const { hashPassword } = require('../helpers/hash');
const validate = require('mongoose-validator');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Invalid email'
      })
    ],
  },
  password: {
    type: String,
    require: true
  },
  createdAt: Date,
  views: Number,
  bronze: [],
  silver: [],
  gold: [],
  watchTag: [],
  profile_image: String,
  city: String
})

UserSchema.pre('save', function (next) {
  this.password = hashPassword(this.password);
  this.createdAt = new Date();
  this.views = 0
  this.watchTag = [];
  this.silver = [];
  this.bronze = [];
  this.gold = []
  this.profile_image = 'https://storage.cloud.google.com/defaultimage/59162520-blanco-perfil-de-usuario-icono-en-el-boto%CC%81n-negro-aislado-en-blanco.jpg?authuser=1&folder&organizationId'
  next()
})

const User = Mongoose.model('users', UserSchema);


module.exports = User;