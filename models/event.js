import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Profile'},
  content: { type: String, required: true},
}, {
  timestamps: true,
})

const eventSchema = new Schema({
  title: String,
  description: String,
  category: { type: String, enum: ['Gaming', 'Party', 'Media', 'Fitness', 'Arts', 'Food', 'Sports'] },
  date: Date,
  host: { type: Schema.Types.ObjectId, ref: 'Profile' },
  pendingGuests: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  approvedGuests: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  geoLocation: [Number],
  address: String,
  accessNotes: String,
  comments: [commentSchema],
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Over'] },
},{
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema)

export { Event }
