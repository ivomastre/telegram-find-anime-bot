import { Schema, model } from 'mongoose';
import { IUser } from './index';

const schema = new Schema<IUser>({
  name: { type: String, required: true, default: 'John Doe' },
  telegramId: { type: String, required: true, unique: true },
  score: { type: Number, required: true, index: -1, default: 0 },
});

const UserModel = model<IUser>('User', schema);
export default UserModel;
