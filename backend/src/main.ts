import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAppConfigs } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply all application configurations
  setupAppConfigs(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error(error);
});
