import { Telegraf, Scenes, session } from 'telegraf';

import { BOT_TOKEN } from './config/env';
import quizScene from './scenes/quizScene';

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([quizScene()]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => {
  ctx.scene.enter('quiz');
});

bot.catch((err, ctx) => {
  console.log('Error: ', err);
  if (ctx?.wizard?.state?.correctAnime) {
    ctx.reply('A quiz is already happening.');
  } else {
    ctx.reply('Message is not sent due to an error');
  }
});
bot.launch();

console.log('INFO', bot.botInfo);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
