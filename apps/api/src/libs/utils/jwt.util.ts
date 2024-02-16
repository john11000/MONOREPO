import * as process from 'process';
import jwt from 'jsonwebtoken';

import { Payload } from '@ocmi/api/app/auth/interface/types';

export const generateJwt = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  });
};
