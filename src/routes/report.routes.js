// src/routes/report.routes.js
import express from 'express';
import {
  getUserServiceHistory,
  getUpcomingServices,
  getOverdueInvoices
} from '../controllers/report.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

/**
 * @openapi
 * /users/{userId}/services:
 *   get:
 *     summary: Get all services for a user across their vehicles
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch services for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of services for the user
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
 *                   invoice:
 *                     type: object
 *                     properties:
 *                       totalAmount:
 *                         type: number
 *                       paymentStatus:
 *                         type: string
 *       404:
 *         description: User not found
 */
router.get('/users/:userId/services', authRequired, getUserServiceHistory);

/**
 * @openapi
 * /services/upcoming:
 *   get:
 *     summary: Get all upcoming scheduled services
 *     responses:
 *       200:
 *         description: List of upcoming services
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
 *       404:
 *         description: No upcoming services found
 */
router.get('/services/upcoming', authRequired, getUpcomingServices);

/**
 * @openapi
 * /invoices/overdue:
 *   get:
 *     summary: Get all overdue invoices
 *     responses:
 *       200:
 *         description: List of overdue invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   totalAmount:
 *                     type: number
 *                   taxAmount:
 *                     type: number
 *                   paymentStatus:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *       404:
 *         description: No overdue invoices found
 */
router.get('/invoices/overdue', authRequired, getOverdueInvoices);

export default router;
