import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(
  config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB_DATABASE
  },
  (err) => {
    if (err) throw err;
    console.log('Data Base Connected.');
  }
);
