import 'dotenv/config';

declare let process: {
  env: {
    BOT_TOKEN: string;
    DB_URI: string;
    PORT: number;
    URL: string;
    SUCCESS_STICKER: string;
    FAILURE_STICKER: string;
  };
};

export const {
  BOT_TOKEN = '',
  DB_URI = '',
  PORT = 3000,
  URL = '',
  SUCCESS_STICKER = '',
  FAILURE_STICKER = '',
} = process.env;
