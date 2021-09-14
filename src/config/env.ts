import 'dotenv/config';

declare let process: {
  env: {
    BOT_TOKEN: string;
    DB_URI: string;
  };
};

export const { BOT_TOKEN = '', DB_URI = '' } = process.env;
