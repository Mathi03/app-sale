import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';

import { createRoles } from './database/seeds/role.seeder';
import { createAdmin } from './database/seeds/user.seeder';

const app = express();
const env = process.env.NODE_ENV;

// Seeders
createRoles();
createAdmin();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(helmet());

// Peticiones en la consola
app.use(morgan('dev'));
// Analiza solicitudes de content-type/applicaction-json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Api Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Production
const buildPath = path.join(__dirname, '..', 'frontend/build');
if (env == 'production') app.use('/', express.static(buildPath));

export default app;
