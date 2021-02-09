import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';
import serverConfig from './configs/server.config';
import typeormConfig, { TypeOrmConfig } from './configs/typeorm.config';
import jwtConfig from './configs/jwt.config';
import { AppConfigService } from './app-config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: [serverConfig, typeormConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get<TypeOrmConfig>('typeOrmConfig'),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService, AppConfigService],
})
export class AppModule {}
