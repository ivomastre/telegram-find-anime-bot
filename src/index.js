
const retryForever = require('./commands/search.js');
const { Telegraf } = require('telegraf')
const LocalSession = require('telegraf-session-local')
const { session } = require('telegraf')
require('dotenv').config()
const TelegrafStatelessQuestion = require('telegraf-stateless-question');

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.use((new LocalSession({ database: 'db.json' })).middleware())
const animeQuestion = new TelegrafStatelessQuestion('anime', ctx => {
    try{
        console.log(ctx.session.id);
        console.log(String(ctx.message.chat.id + ':' + ctx.message.from.id));
        console.log(ctx.session.id == String(ctx.message.chat.id + ':' + ctx.message.from.id))

        if (ctx.session.id == String(ctx.message.chat.id + ':' + ctx.message.from.id)){
            ctx.session.score = ctx.session.score || 0;
            var stringSimilarity = require("string-similarity");
            var similarity = stringSimilarity.compareTwoStrings(ctx.session.name, ctx.message.text);
            console.log(similarity)
            if (similarity>=0.50){
                
                ctx.session.score++
                ctx.replyWithHTML("Acertou");
                
            }
            else{
                ctx.replyWithHTML("Errou");
            }
            ctx.replyWithHTML("\nScore atual: " + ctx.session.score);
            ctx.session.id = ""
        }
    }
    catch(err){
        console.log(err);
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