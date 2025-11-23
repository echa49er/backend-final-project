import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

// Route imports (ESM default exports)
import userRoutes from './routes/user.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import serviceRoutes from './routes/service.routes.js';
import mechanicRoutes from './routes/mechanic.routes.js';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Test database connection
app.get('/test', async (req, res) => {
  try {
    await prisma.$connect();
    res.send('Database connection successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database connection failed');
  } finally {
    await prisma.$disconnect();
  }
});

// API routes
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/services', serviceRoutes);
app.use('/mechanics', mechanicRoutes);

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
