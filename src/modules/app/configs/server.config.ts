import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  env: string;
  port: number;
}

export default registerAs(
  'serverConfig',
  (): ServerConfig => ({
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.SERVER_PORT) || 3000,
  }),
);
