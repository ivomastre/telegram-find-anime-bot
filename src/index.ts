import { Telegraf, Scenes, session } from 'telegraf';

import scoreCommand from './commands/score';
import { BOT_TOKEN } from './config/env';
import setupDb from './config/setupDb';
import quizScene from './scenes/quizScene';

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([quizScene()]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => {
  ctx.scene.enter('quiz');
});

bot.command('score', async ctx => {
  scoreCommand(ctx);
});

bot.catch((err, ctx) => {
  console.log('Error: ', err);
  if (err.code === '11000') {
    ctx.reply('Message is not sent due to an error');
  } else if (ctx?.wizard?.state?.correctAnime) {
    ctx.reply('A quiz is already happening.');
  } else {
    ctx.reply('Message is not sent due to an error');
  }
});

setupDb();
bot.launch();

console.log('INFO', bot.botInfo);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
