
const retryForever = require('./commands/search.js');
const { Telegraf } = require('telegraf')
require('dotenv').config()
const TelegrafStatelessQuestion = require('telegraf-stateless-question');

const bot = new Telegraf(process.env.BOT_TOKEN);
const animeQuestion = new TelegrafStatelessQuestion('anime', ctx => {
    console.log('User thinks unicorns are doing:', ctx.message)
})

// Dont forget to use the middleware
bot.use(animeQuestion.middleware())

bot.command('search', async ctx => {
    const anime =await retryForever(ctx);
    return animeQuestion.replyWithHTML(ctx, anime)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))