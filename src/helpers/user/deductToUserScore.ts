import { IUser } from '../../models/user';
import getUserScore from './getUserScore';

const deductToUserScore = async (
  telegramId: string,
  userName: string
): Promise<IUser> => {
  const user = await getUserScore(telegramId, userName);
  if (user.score === 0) return user;

  if (user.winStreak > user.stats.biggestWinStreak) {
    user.stats.biggestWinStreak = user.winStreak;
  }
  user.score -= 1;
  user.stats.losses += 1;
  user.winStreak = 0;

  user.save();

  return user;
};

export default deductToUserScore;
