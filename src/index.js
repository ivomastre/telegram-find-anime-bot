
const retryForever = require('./commands/search.js');
const { Telegraf } = require('telegraf')
const { session } = require('telegraf')
require('dotenv').config()
const TelegrafStatelessQuestion = require('telegraf-stateless-question');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session({
    makeKey: (ctx) => ctx.from.id // only store data per user, but across chats
}))
const animeQuestion = new TelegrafStatelessQuestion('anime', ctx => {
    var stringSimilarity = require("string-similarity");
    var similarity = stringSimilarity.compareTwoStrings(ctx.session.name, ctx.message.text);
    console.log(similarity)
    if (similarity>=0.50){
        ctx.replyWithHTML("Acertou");
    }
    else{
        ctx.replyWithHTML("Errou");
    }
})

// Dont forget to use the middleware
bot.use(animeQuestion.middleware())

bot.command('start', async ctx => {
    const anime =await retryForever(ctx);
    return animeQuestion.replyWithHTML(ctx, anime)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))