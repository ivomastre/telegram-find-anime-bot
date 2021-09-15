import { IUser } from '../models/user';
import getUserScore from './getUserScore';

const addToUserScore = async (
  telegramId: string,
  userName: string
): Promise<IUser> => {
  const user = await getUserScore(telegramId, userName);

  user.score += 1;
  user.stats.wins += 1;

  user.save();

  return user;
};

export default addToUserScore;
