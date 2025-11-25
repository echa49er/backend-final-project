// src/routes/vehicle.routes.js
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

/**
 * @openapi
 * /vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle details
 */
router.get('/:id', VehicleController.getVehicleById);

/**
 * @openapi
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               mileage:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 */
router.post('/', VehicleController.createVehicle);

/**
 * @openapi
 * /vehicles/{id}:
 *   put:
 *     summary: Update vehicle by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated vehicle
 */
router.put('/:id', VehicleController.updateVehicle);

/**
 * @openapi
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle deleted
 */
router.delete('/:id', VehicleController.deleteVehicle);

export default router;
