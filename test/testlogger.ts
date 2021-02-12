/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';

export class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {
    console.error(message);
    console.error(trace);
  }
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}
