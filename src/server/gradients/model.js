import mongoose from 'mongoose'


const Schema = mongoose.Schema
const gradientSchema = new Schema({
  angle: Number,
  colors: [{
    code: String,
    position: Number
  }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now }
})

export default mongoose.model('Gradient', gradientSchema)
