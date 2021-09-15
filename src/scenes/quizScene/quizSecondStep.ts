import { FAILURE_STICKER, SUCCESS_STICKER } from '../../config/env';
import addToUserScore from '../../helpers/addtoUserScore';
import deductToUserScore from '../../helpers/deductToUserScore';
import formatMention from '../../helpers/formatMention';

const quizSecondStep = async (ctx: any) => {
  const userTelegramId = ctx.update.callback_query.from.id;
  const userFirstName = ctx.update.callback_query.from.first_name;

  let caption = '';
  let stickerName = '';

  if (ctx.callbackQuery.data === (ctx.wizard.state as any).correctAnime) {
    const user = await addToUserScore(userTelegramId, userFirstName);

    caption = `${formatMention(
      userTelegramId,
      user.name
    )} *answered:* \`\`\`\n${
      ctx.callbackQuery.data
    }\`\`\` \n*Correct! ✔️ - New Score: ${user.score}*`;
    stickerName = SUCCESS_STICKER;
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

  ctx.editMessageCaption(caption, { parse_mode: 'Markdown' });
  ctx.replyWithSticker(stickerName);

  return ctx.scene.leave();
};

export default quizSecondStep;
