import { Schema, model } from 'mongoose';

import { IUser } from './index';

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true, default: 'John Doe' },
    telegramId: { type: String, required: true, unique: true },
    score: { type: Number, required: true, index: -1, default: 0 },
    winStreak: { type: Number, required: true, default: 0 },
    stats: {
      wins: { type: Number, required: true, default: 0 },
      losses: { type: Number, required: true, default: 0 },
      biggestWinStreak: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', schema);
export default UserModel;
