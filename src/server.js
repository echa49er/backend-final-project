import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { prisma } from './prisma/client.js'; // Your Prisma client

// --- Import all your route files ---
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import mechanicRoutes from './routes/mechanic.routes.js';
import serviceRoutes from './routes/service.routes.js';
import serviceTypeRoutes from './routes/serviceType.routes.js';
import reportRoutes from './routes/report.routes.js';

// --- Import Swagger ---
// (Assuming 'swagger.js' exports 'specs' and 'swaggerUi')
import { specs, swaggerUi } from './swagger.js';

// --- Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Core Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logging for development
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false })); // Body parser for forms

// --- API Routes ---
// All your application routes are prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/reports', reportRoutes);

// --- Swagger Documentation Route ---
// This serves the Swagger UI at the /docs endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- Health Check Route ---
// A simple route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running successfully.' });
});

// --- 404 Not Found Handler ---
// This catches any request that doesn't match a route above
// This is the code that was running in your error log
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// --- Generic Error Handler ---
// This catches all errors passed by 'next(error)'
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Internal Server Error',
    },
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});