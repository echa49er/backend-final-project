// src/routes/service.routes.js
import express from 'express';
import * as ServiceController from '../controllers/service.controller.js';

const router = express.Router();

/**
 * @openapi
 * /services:
 *   get:
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vehicleId:
 *                     type: integer
 *                   serviceTypeId:
 *                     type: integer
 *                   scheduledDate:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/', ServiceController.getServices);

/**
 * @openapi
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service details
 *       404:
 *         description: Service not found
 */
router.get('/:id', ServiceController.getServiceById);

/**
 * @openapi
 * /services:
 *   post:
 *     summary: Create a new service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleId:
 *                 type: integer
 *               serviceTypeId:
 *                 type: integer
 *               scheduledDate:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service created
 *       400:
 *         description: Invalid input
 */
router.post('/', ServiceController.createService);

/**
 * @openapi
 * /services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Service not found
 */
router.put('/:id', ServiceController.updateService);

/**
 * @openapi
 * /services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Service not found
 */
router.delete('/:id', ServiceController.deleteService);

export default router;
