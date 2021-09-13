import { Scenes, Markup } from 'telegraf';

import fetchQuiz from '../fetchQuiz';

function quizScene() {
  const scene = new Scenes.WizardScene(
    'quiz',
    async ctx => {
      const animes = await fetchQuiz();
      const correctAnime = animes[Math.floor(Math.random() * animes.length)];

      const buttonCallbackArray = animes.map(anime =>
        Markup.button.callback(anime.title, anime.title)
      );

      const inlineQuiz = Markup.inlineKeyboard([
        buttonCallbackArray.slice(0, 2),
        buttonCallbackArray.slice(-2),
      ]);

      await ctx.replyWithPhoto(correctAnime.image_url, {
        caption: 'Starting the quiz. Choose one!',
        reply_markup: {
          remove_keyboard: true,
        },
        ...inlineQuiz,
      });

      ctx.wizard.state.correctAnime = correctAnime.title;
      return ctx.wizard.next();
    },
    async ctx => {
      if (ctx.callbackQuery.data === ctx.wizard.state.correctAnime) {
        ctx.editMessageCaption(
          `${ctx.callbackQuery.from.first_name} answered ${ctx.callbackQuery.data} - Correct!`
        );
        // todo persistent ranking
      } else {
        ctx.editMessageCaption(
          `${ctx.callbackQuery.from.first_name} answered ${ctx.callbackQuery.data}`
        );
      }

      return ctx.scene.leave();
    }
  );
  return scene;
}

export default quizScene;
