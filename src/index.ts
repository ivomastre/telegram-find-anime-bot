import { Telegraf, Scenes, session } from 'telegraf';

import changeName from './commands/changeName';
import scoreCommand from './commands/score';
import { BOT_TOKEN, PORT, URL } from './config/env';
import setupDb from './config/setupDb';
import createSecretPath from './helpers/createSecretPath';
import quizScene from './scenes/quizScene';

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([quizScene()]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async (ctx: any) => {
  ctx.scene.enter('quiz');
});

bot.command('top10', async ctx => {
  scoreCommand(ctx);
});

bot.command('changename', async (ctx, next) => {
  changeName(ctx, next);
});

bot.catch((err, ctx) => {
  console.log('Error: ', err);
  ctx.reply('Message is not sent due to an error');
});
setupDb();

const secretPath = `/webhooks/${createSecretPath()}`;

bot.launch({
  webhook: {
    domain: URL,
    hookPath: secretPath,
    port: PORT,
  },
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
