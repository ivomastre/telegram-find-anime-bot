import { Document } from 'mongoose';

import UserModel from './model';

export interface IUser extends Document {
  name: string;
  telegramId: string;
  score: number;
  winStreak: number;
  stats: {
    wins: number;
    losses: number;
    biggestWinStreak: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default UserModel;
