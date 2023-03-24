import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', eventsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, eventsCtrl.show)
router.post('/', checkAuth, eventsCtrl.create)
router.post('/:id/comments', checkAuth, eventsCtrl.createComment)
router.put('/:id', checkAuth, eventsCtrl.update)
router.delete('/:id', checkAuth, eventsCtrl.delete)
router.delete('/:id/comments/:commentId', checkAuth, eventsCtrl.deleteComment)

export { router }
