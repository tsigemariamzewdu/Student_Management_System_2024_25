import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHealthStatus(): string {
    return 'The application is running smoothly!';
  }
}
