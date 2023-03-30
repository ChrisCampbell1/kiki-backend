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
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
}

const create = async (req, res) => {
  try {
    req.body.host = req.user.profile
    const event = await Event.create(req.body)
    const newEvent = await Event.findById(event._id)
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    const profile = await Profile.findById(req.body.host)
    profile.events.push(event._id)
    profile.save()
    event.approvedGuests.push(req.body.host)
    event.save()
    res.status(200).json(newEvent)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
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
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
}

const requestInvite = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    if(event.pendingGuests.includes(req.user.profile)) {
      res.status(200).json(event)
    } else {
      event.pendingGuests.push(req.user.profile)
      event.save()
      res.status(200).json(event)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const approveInvite = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    if (event.approvedGuests.includes(req.params.guestId)) {
      res.status(200).json(event)
    } else {
      event.pendingGuests.pull(req.params.guestId)
      event.approvedGuests.push(req.params.guestId)
      event.save()
      res.status(200).json(event)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const removeInvite = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host')
      .populate('pendingGuests')
      .populate('approvedGuests')
      .populate('comments.author', ['name', 'photo'])
    event.approvedGuests.pull(req.params.guestId)
    event.pendingGuests.push(req.params.guestId)
    event.save()
    res.status(200).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  index,
  show,
  create,
  update,
  deleteEvent as delete,
  createComment,
  deleteComment,
  requestInvite,
  approveInvite,
  removeInvite
}
