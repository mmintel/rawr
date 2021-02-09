import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntityTypeORM } from 'src/modules/user/infrastructure/typeorm/user.entity';

export type TypeOrmConfig = TypeOrmModuleOptions;

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmConfig => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nest',
    entities: [UserEntityTypeORM],
    synchronize: true,
  }),
);
