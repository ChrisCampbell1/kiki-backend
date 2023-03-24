import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  bio: String,
  age: Number,
  homeCity: String,
  interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  location: [Number]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
