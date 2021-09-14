// @ts-nocheck
import fs from 'fs/promises';
import { Context } from 'telegraf';

import addToUserScore from '../../helpers/addtoUserScore';
import deductToUserScore from '../../helpers/deductToUserScore';

const quizSecondStep = async (ctx: Context) => {
  const userTelegramId = ctx.update.callback_query.from.id;
  const userFirstName = ctx.update.callback_query.from.first_name;

  const mention = `[${userFirstName}](tg://user?id=${userTelegramId})`;
  let caption = '';
  let photoPath = '';

  if (ctx.callbackQuery.data === ctx.wizard.state.correctAnime) {
    const user = await addToUserScore(userTelegramId, userFirstName);

    caption = `${mention} answered ${ctx.callbackQuery.data} - Correct! - New Score: ${user.score}`;
    photoPath = 'src/public/images/success.png';
  } else {
    const user = await deductToUserScore(userTelegramId, userTelegramId);

    caption = `${mention} answered ${ctx.callbackQuery.data} - Wrong! - Score: ${user.score}`;
    photoPath = 'src/public/images/failure.png';
  }

  ctx.editMessageCaption(caption, { parse_mode: 'Markdown' });
  ctx.replyWithPhoto({ source: Buffer.from(await fs.readFile(photoPath)) });

  return ctx.scene.leave();
};

export default quizSecondStep;
