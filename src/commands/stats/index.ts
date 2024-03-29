import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

import formatMention from '../../helpers/formatMention';
import getUserScore from '../../helpers/user/getUserScore';

const statsCommand = async (
  ctx: Context,
  next: () => Promise<void>
): Promise<Message.TextMessage | void> => {
  if (!ctx.message || !('text' in ctx.message)) return next();

  const match = ctx.state.command;
  const mentionUser = match.mention?.user;

  const userTelegramId = mentionUser
    ? mentionUser.id
    : String(ctx.message.from.id);
  const userFirstName = mentionUser
    ? mentionUser.first_name
    : ctx.message.from.first_name;

  const user = await getUserScore(userTelegramId, userFirstName);

  return ctx.replyWithMarkdown(
    `${formatMention(userTelegramId, userFirstName)} has : \n *${
      user.score
    } points 👏\n ${user.stats.wins} wins ✔️\n ${
      user.stats.losses
    } losses ❌ \n Biggest Win Streak: ${user.stats.biggestWinStreak}*`
  );
};

export default statsCommand;
