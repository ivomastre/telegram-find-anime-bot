import mongoose from 'mongoose';

import { DB_URI } from './env';

const setupDb = (): void => {
  mongoose.connect(DB_URI, { retryWrites: true, w: 'majority' });
  console.log('Connected to MongoDB');
};

export default setupDb;
