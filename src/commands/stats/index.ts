import { Context } from 'telegraf';

import getUserScore from '../../helpers/getUserScore';

const statsCommand = async (ctx: Context, next: () => Promise<void>) => {
  if (!('text' in ctx.message!)) return next();

  const userTelegramId = String(ctx.message.from.id);
  const userFirstName = ctx.message.from.first_name;

  const user = await getUserScore(userTelegramId, userFirstName);

  return ctx.replyWithMarkdown(
    `You have: \n *${user.score} points 👏\n ${user.stats.wins} wins ✔️\n ${user.stats.losses} losses ❌* `
  );
};

export default statsCommand;
