import { Context, Middleware } from 'telegraf';

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

const commandsArgsHandler: Middleware<Context> = (ctx, next) => {
  if (!ctx.message || !('text' in ctx.message!)) return next();

  const message = ctx.message.text;
  const match = regex.exec(message);

  if (!match) {
    return undefined;
  }

  ctx.state.command = {
    fullCommand: match[0],
    command: match[1],
    botName: match[2],
    args: match[3],
    splitedArgs: match[3]
      ? match[3].split(/\s+/g).filter(arg => arg.length)
      : [], // remove space characters and then filter empty strings
    mention: ctx.message.entities?.filter(
      entity => entity.type === 'text_mention' && !entity.user.is_bot
    )[0],
  };

  return next();
};

export default commandsArgsHandler;
