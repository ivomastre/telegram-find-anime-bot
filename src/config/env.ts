import 'dotenv/config';

declare let process: {
  env: {
    BOT_TOKEN: string;
  };
};

export const { BOT_TOKEN = '' } = process.env;
