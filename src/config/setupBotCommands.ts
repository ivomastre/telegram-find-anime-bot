import { Context, Telegraf } from 'telegraf';

const setupBotCommandsInfo = async (bot: Telegraf<Context>) => {
  bot.telegram.setMyCommands([
    {
      command: 'quiz',
      description: 'Start the quiz.',
    },
    {
      command: 'top10',
      description: 'Show the top 10 highest scores.',
    },
    {
      command: 'changename',
      description: 'Change your name (e.g /changeName John Doe).',
    },
    {
      command: 'stats',
      description:
        'Show your stats. You can also see another person stats (e.g /stats [text_mention]).',
    },
  ]);
};

export default setupBotCommandsInfo;
