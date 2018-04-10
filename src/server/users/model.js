import mongoose from 'mongoose'


const Schema = mongoose.Schema
const userSchema = new Schema({
  facebook: String,
  created: { type: Date, default: Date.now },

  firstName: String,
  lastName: String,

  photo: String
})

export default mongoose.model('User', userSchema)
