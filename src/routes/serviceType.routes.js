import express from 'express';
import {
  getServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType
} from '../controllers/serviceType.controller.js';

const router = express.Router();

router.get('/', getServiceTypes);
router.get('/:id', getServiceTypeById);
router.post('/', createServiceType);
router.put('/:id', updateServiceType);
router.delete('/:id', deleteServiceType);

export default router;
