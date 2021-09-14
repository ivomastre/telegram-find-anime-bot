import { IUser } from '../models/user';
import UserModel from '../models/user/model';

const getUser = async (
  telegramId: string,
  userName: string
): Promise<IUser> => {
  let user = await UserModel.findOne({ telegramId });

  if (!user) {
    user = await UserModel.create({ telegramId, name: userName });
  }

  return user;
};

export default getUser;
