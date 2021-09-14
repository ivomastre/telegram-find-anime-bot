import { Document } from "mongoose";
import UserModel from "./model";
export interface IUser extends Document {
  name: string;
  telegramId: string;
  score: number;
}

export default UserModel;