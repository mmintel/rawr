import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: [/localhost/],
    exposedHeaders: ['Content-Range'],
    credentials: true,
  });
  app.use(helmet());

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
