import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  // PORT
  appPort: number;
  // JWT
  jwtSecret: string;
  jwtExpiresIn: string;
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    // PORT
    appPort: Number(process.env.APP_PORT) || 4000,
    // JWT
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiresIn: process.env.JWT_EXPIRATION || '',
  }),
);

export default configurations;

export function configRoot(): ConfigModuleOptions {
  return {
    load: [configurations],
    isGlobal: true,
    validationSchema: Joi.object({
      // PORT
      APP_PORT: Joi.number().required(),
      // JWT
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
      // PRISMA
      DB_URL: Joi.string().required(),
    }),
  };
}
