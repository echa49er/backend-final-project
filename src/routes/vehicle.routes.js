import express from 'express';
import * as VehicleController from '../controllers/vehicle.controller.js';

const router = express.Router();

/**
 * @openapi
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     responses:
 *       200:
 *         description: List of vehicles
 */
router.get('/', VehicleController.getVehicles); 
router.get('/:id', VehicleController.getVehicleById);
router.post('/', VehicleController.createVehicle);
router.put('/:id', VehicleController.updateVehicle);
router.delete('/:id', VehicleController.deleteVehicle);

export default router;
