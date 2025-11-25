// src/routes/mechanic.routes.js
import express from 'express';
import * as MechanicController from '../controllers/mechanic.controller.js';

const router = express.Router();

/**
 * @openapi
 * /mechanics:
 *   get:
 *     summary: Get all mechanics
 *     responses:
 *       200:
 *         description: List of all mechanics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   department:
 *                     type: string
 */
router.get('/', MechanicController.getMechanics);

/**
 * @openapi
 * /mechanics/{id}:
 *   get:
 *     summary: Get a mechanic by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the mechanic to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mechanic details
 *       404:
 *         description: Mechanic not found
 */
router.get('/:id', MechanicController.getMechanicById);

/**
 * @openapi
 * /mechanics:
 *   post:
 *     summary: Create a new mechanic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mechanic created
 *       400:
 *         description: Invalid input
 */
router.post('/', MechanicController.createMechanic);

/**
 * @openapi
 * /mechanics/{id}:
 *   put:
 *     summary: Update a mechanic by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the mechanic to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mechanic updated
 *       404:
 *         description: Mechanic not found
 */
router.put('/:id', MechanicController.updateMechanic);

/**
 * @openapi
 * /mechanics/{id}:
 *   delete:
 *     summary: Delete a mechanic by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the mechanic to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mechanic deleted
 *       404:
 *         description: Mechanic not found
 */
router.delete('/:id', MechanicController.deleteMechanic);

export default router;
