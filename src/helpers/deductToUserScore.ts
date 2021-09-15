import { IUser } from '../models/user';
import getUserScore from './getUserScore';

const deductToUserScore = async (
  telegramId: string,
  userName: string
): Promise<IUser> => {
  const user = await getUserScore(telegramId, userName);
  if (user.score === 0) return user;

  user.score -= 1;
  user.stats.losses += 1;

  user.save();

  return user;
};

export default deductToUserScore;
