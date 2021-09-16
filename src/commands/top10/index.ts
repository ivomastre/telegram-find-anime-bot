import { Context } from 'telegraf';

import listUserScore from '../../helpers/user/listUserScore';
import formatScore from './formatScore';

const top10Command = async (ctx: Context): Promise<void> => {
  const users = await listUserScore();
  const formatedUsers = formatScore(users);

  ctx.replyWithMarkdownV2(formatedUsers);
};

export default top10Command;
