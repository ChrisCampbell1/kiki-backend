import { Profile } from '../models/profile.js'
import { Event } from '../models/event.js'

const index = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    res.status(200).json(events)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    req.body.host = req.user.profile
    const event = await Event.create(req.body)
    const profile = await Profile.findById(req.body.host)
    profile.events.push(event._id)//todo needs work
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const event = await Event.findById(req.params.id)
    event.comments.push(req.body)
    await event.save()
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const deleteComment = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    event.comments.pull(req.params.commentId)
    await event.save()
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

export { 
  index,
  show,
  create,
  update,
  deleteEvent as delete,
  createComment,
  deleteComment
}
