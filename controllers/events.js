import { Profile } from '../models/profile.js'
import { Event } from '../models/event'

const index = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
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
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    const event = await Event.create(req.body)
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
