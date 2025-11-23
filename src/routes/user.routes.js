import express from 'express'
import * as UserController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser)

export default router
