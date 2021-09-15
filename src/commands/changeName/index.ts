import { Context } from 'telegraf';

import formatMention from '../../helpers/formatMention';
import getUser from '../../helpers/getUserScore';

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

const changeName = async (ctx: Context, next: () => Promise<void>) => {
  if (!('text' in ctx.message!)) return next();

  const match = regex.exec(ctx.message.text);
  const userTelegramId = String(ctx.message.from.id);

  if (!match) return next();

  const newName = match[3];

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
