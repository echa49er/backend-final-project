import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { prisma } from './prisma/client.js';

// --- Import all your route files ---
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import mechanicRoutes from './routes/mechanic.routes.js';
import serviceRoutes from './routes/service.routes.js';
import serviceTypeRoutes from './routes/serviceType.routes.js';
import reportRoutes from './routes/report.routes.js';

// --- Import Swagger ---
import swaggerUi from 'swagger-ui-express'; // <-- FIX: Import directly from the package
import specs from './swagger.js'; // <-- FIX: Import 'specs' as the default export

// --- Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Core Middleware ---
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/reports', reportRoutes);

// --- Swagger Documentation Route ---
// This uses the 'swaggerUi' and 'specs' variables correctly
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running successfully.' });
});

// --- 404 Not Found Handler ---
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// --- Generic Error Handler ---
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