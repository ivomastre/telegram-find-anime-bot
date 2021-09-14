import crypto from 'crypto';

import { BOT_TOKEN } from '../config/env';

const createSecretPath = (): string => {
  return crypto
    .createHash('sha3-256')
    .update(BOT_TOKEN)
    .update(process.version)
    .digest('hex');
};

export default createSecretPath;
