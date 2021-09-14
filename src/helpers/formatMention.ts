const formatMention = (
  userTelegramId: string,
  userFirstName: string
): string => {
  return `[${userFirstName}](tg://user?id=${userTelegramId})`;
};

export default formatMention;
