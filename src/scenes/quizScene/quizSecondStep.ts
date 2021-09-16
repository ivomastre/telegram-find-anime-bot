import { FAILURE_STICKER, SUCCESS_STICKER } from '../../config/env';
import formatMention from '../../helpers/formatMention';
import addToUserScore from '../../helpers/user/addtoUserScore';
import deductToUserScore from '../../helpers/user/deductToUserScore';

const quizSecondStep = async (ctx: any) => {
  const userTelegramId = ctx.update.callback_query.from.id;
  const userFirstName = ctx.update.callback_query.from.first_name;

  let caption = '';
  let stickerName = '';
  let winStreak = 0;

  if (ctx.callbackQuery.data === (ctx.wizard.state as any).correctAnime) {
    const user = await addToUserScore(userTelegramId, userFirstName);

    caption = `${formatMention(
      userTelegramId,
      user.name
    )} *answered:* \`\`\`\n${
      ctx.callbackQuery.data
    }\`\`\` \n*Correct! ✔️ - New Score: ${user.score}*`;
    stickerName = SUCCESS_STICKER;
    winStreak = user.stats.winStreak;
  } else {
    const user = await deductToUserScore(userTelegramId, userTelegramId);

    caption = `${formatMention(
      userTelegramId,
      user.name
    )} *answered:* \`\`\`\n${
      ctx.callbackQuery.data
    }\`\`\` \n*Wrong! ❌ - New Score: ${user.score}*`;
    stickerName = FAILURE_STICKER;
  }

  caption = `${caption} \n\n*Correct anime: * \`\`\`\n${ctx.scene.session.correctAnime}\`\`\``;
  caption = `${caption} \n*Win streak: ${winStreak}*`;

  ctx.editMessageCaption(caption, { parse_mode: 'Markdown' });
  ctx.replyWithSticker(stickerName);

  return ctx.scene.leave();
};

export default quizSecondStep;
