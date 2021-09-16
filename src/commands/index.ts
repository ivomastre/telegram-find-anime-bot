import { Context, Telegraf } from 'telegraf';

import changeName from './changeName';
import statsCommand from './stats';
import top10Command from './top10';

interface ICommand {
  name: string;
  fn: (ctx: Context, next: () => Promise<void>) => Promise<void>;
}

const commands: ICommand[] = [
  {
    name: 'changename',
    fn: async (ctx, next) => {
      changeName(ctx, next);
    },
  },
  {
    name: 'quiz',
    fn: async (ctx: any) => {
      ctx.scene.enter('quiz');
    },
  },
  {
    name: 'top10',
    fn: async ctx => {
      top10Command(ctx);
    },
  },
  {
    name: 'stats',
    fn: async (ctx, next) => {
      statsCommand(ctx, next);
    },
  },
];

const setupCommands = (bot: Telegraf<Context>) => {
    commands.forEach(({ name, fn }) => {
      bot.command(name, fn);
    });
};

export default setupCommands;
