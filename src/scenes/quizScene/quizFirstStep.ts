import { Markup } from 'telegraf';

import fetchQuiz from '../../helpers/fetchQuiz';
import QuizModel from '../../models/quiz';

const quizFirstStep = async (ctx: any): Promise<any> => {
  const animes = await fetchQuiz();
  const correctAnime = animes[Math.floor(Math.random() * animes.length)];
  ctx.scene.session.correctAnime = correctAnime.title;

  await QuizModel.create({
    correctAnime: correctAnime.title,
    animes,
  });

  const buttonCallbackArray = animes.map(anime =>
    Markup.button.callback(anime.title, anime.title)
  );

  const inlineQuiz = Markup.inlineKeyboard([
    buttonCallbackArray.slice(0, 2),
    buttonCallbackArray.slice(-2),
  ]);

  await ctx.replyWithPhoto(correctAnime.image_url, {
    caption: 'Starting the quiz. Choose one!',
    ...inlineQuiz,
  });

  ctx.wizard.state.correctAnime = correctAnime.title;
  return ctx.wizard.next();
};

export default quizFirstStep;
