import { Telegraf, Scenes, session } from 'telegraf';

import changeName from './commands/changeName';
import statsCommand from './commands/stats';
import top10Command from './commands/top10';
import { BOT_TOKEN, PORT, URL } from './config/env';
import setupDb from './config/setupDb';
import createSecretPath from './helpers/createSecretPath';
import commandsArgsHandler from './middlewares/commandsArgsHandler';
import quizScene from './scenes/quizScene';

const bot = new Telegraf(BOT_TOKEN);
// bot.telegram.setMyCommands
// TODO: Automatically add command info
const stage = new Scenes.Stage([quizScene()]);

bot.use(session());
bot.use(stage.middleware());
bot.use(commandsArgsHandler);

bot.command('start', async (ctx: any) => {
  ctx.scene.enter('quiz');
});

bot.command('top10', async ctx => {
  top10Command(ctx);
});

bot.command('changename', async (ctx, next) => {
  changeName(ctx, next);
});

bot.command('stats', async (ctx, next) => {
  statsCommand(ctx, next);
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

// TODO: changed start command to quiz
