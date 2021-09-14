import { Context } from 'telegraf';

import listUserScore from '../../helpers/listUserScore';
import formatScore from './formatScore';

const scoreCommand = async (ctx: Context) => {
  const users = await listUserScore();
  const formatedUsers = await formatScore(users);

  ctx.replyWithMarkdownV2(formatedUsers);
};

export default scoreCommand;
