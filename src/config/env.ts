import 'dotenv/config';

declare let process: {
  env: {
    BOT_TOKEN: string;
    DB_URI: string;
    PORT: number;
    URL: string;
  };
};

export const {
  BOT_TOKEN = '',
  DB_URI = '',
  PORT = 3000,
  URL = '',
} = process.env;
