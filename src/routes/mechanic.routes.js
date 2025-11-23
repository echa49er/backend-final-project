import express from 'express'
import * as MechanicController from '../controllers/mechanic.controller.js'

const router = express.Router()

router.get('/', MechanicController.getMechanics)
router.get('/:id', MechanicController.getMechanicById)
router.post('/', MechanicController.createMechanic)
router.put('/:id', MechanicController.updateMechanic)
router.delete('/:id', MechanicController.deleteMechanic)

export default router
