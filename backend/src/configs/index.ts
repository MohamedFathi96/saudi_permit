import { INestApplication } from '@nestjs/common';
import { setupValidation } from './validations';
import { setupSwagger } from './swagger';
import { setupCors } from './cors';

export function setupAppConfigs(app: INestApplication): void {
  setupValidation(app);
  setupCors(app);
  setupSwagger(app);
}
