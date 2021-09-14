import { IUser } from '../../models/user';

const formatScore = async (users: IUser[]) => {
  return users
    .map((user, index) => {
      return `${index + 1} \\- [${user.name}](tg://user?id=${
        user.telegramId
      }) \\- ${user.score}`;
    })
    .join('\n');
};

export default formatScore;
