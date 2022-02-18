import { config } from 'dotenv';
config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
export default {
  MONGODB_URI:
    process.env.MONGODB_URI ||
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  PORT: process.env.PORT || 4000,
  SECRET: 'sales-app-api',
  EXPIRED_IN: '12h'
};
