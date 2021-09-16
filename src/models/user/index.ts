import { Document } from 'mongoose';

import UserModel from './model';

export interface IUser extends Document {
  name: string;
  telegramId: string;
  score: number;
  stats: {
    wins: number;
    losses: number;
    winStreak: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default UserModel;
