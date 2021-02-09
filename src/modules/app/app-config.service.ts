import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from 'src/modules/app/configs/jwt.config';
import { ServerConfig } from 'src/modules/app/configs/server.config';
import { TypeOrmConfig } from 'src/modules/app/configs/typeorm.config';

@Injectable()
export class AppConfigService {
  private serverConfig: ServerConfig;
  private jwtConfig: JwtConfig;
  private typeOrmConfig: TypeOrmConfig;

  constructor(private configService: ConfigService) {
    this.serverConfig = this.configService.get<ServerConfig>('serverConfig');
    this.jwtConfig = this.configService.get<JwtConfig>('jwtConfig');
    this.typeOrmConfig = this.configService.get<TypeOrmConfig>('typeOrmConfig');
  }

  get isProduction(): boolean {
    return this.serverConfig.env === 'production';
  }

  getTypeOrmConfig(): TypeOrmConfig {
    return this.typeOrmConfig;
  }
}
