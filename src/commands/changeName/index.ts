import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

import formatMention from '../../helpers/formatMention';
import getUser from '../../helpers/user/getUserScore';

const changeName = async (
  ctx: Context,
  next: () => Promise<void>
): Promise<Message.TextMessage | void> => {
  if (!ctx.message || !('text' in ctx.message)) return next();

  const match = ctx.state.command;
  const userTelegramId = String(ctx.message.from.id);

  if (!match) return next();

  const newName = match.args;

  if (!newName) {
    return ctx.reply(`You didn't specify a new name`);
  }

  const user = await getUser(userTelegramId, newName);
  const mention = formatMention(userTelegramId, user.name);

  user.name = newName;
  await user.save();

  return ctx.replyWithMarkdown(
    `Hello ${mention}, your name has been changed to ${newName}`
  );
};

export default changeName;
