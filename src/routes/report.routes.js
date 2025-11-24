import express from 'express';
import {
  getUserServiceHistory,
  getUpcomingServices,
  getOverdueInvoices
} from '../controllers/report.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// protect these if you want:
router.get('/users/:userId/services', authRequired, getUserServiceHistory);
router.get('/services/upcoming', authRequired, getUpcomingServices);
router.get('/invoices/overdue', authRequired, getOverdueInvoices);

export default router;
