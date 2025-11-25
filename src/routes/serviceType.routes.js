// src/routes/serviceType.routes.js
import express from 'express';
import * as ServiceTypeController from '../controllers/serviceType.controller.js';

const router = express.Router();

/**
 * @openapi
 * /service-types:
 *   get:
 *     summary: Get all service types
 *     responses:
 *       200:
 *         description: List of all service types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   estimatedDurationMinutes:
 *                     type: integer
 *                   baseCost:
 *                     type: number
 */
router.get('/', ServiceTypeController.getServiceTypes);

/**
 * @openapi
 * /service-types/{id}:
 *   get:
 *     summary: Get a service type by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service type to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service type details
 *       404:
 *         description: Service type not found
 */
router.get('/:id', ServiceTypeController.getServiceTypeById);

/**
 * @openapi
 * /service-types:
 *   post:
 *     summary: Create a new service type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               estimatedDurationMinutes:
 *                 type: integer
 *               baseCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Service type created
 *       400:
 *         description: Invalid input
 */
router.post('/', ServiceTypeController.createServiceType);

/**
 * @openapi
 * /service-types/{id}:
 *   put:
 *     summary: Update a service type by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service type to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               estimatedDurationMinutes:
 *                 type: integer
 *               baseCost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Service type updated
 *       404:
 *         description: Service type not found
 */
router.put('/:id', ServiceTypeController.updateServiceType);

/**
 * @openapi
 * /service-types/{id}:
 *   delete:
 *     summary: Delete a service type by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service type to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service type deleted
 *       404:
 *         description: Service type not found
 */
router.delete('/:id', ServiceTypeController.deleteServiceType);

export default router;
