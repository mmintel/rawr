import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string;
  signOptions: {
    expiresIn: number;
  };
}

export default registerAs(
  'jwtConfig',
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {
      expiresIn: 3600,
    },
  }),
);
