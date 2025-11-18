import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';


async function bootstrap() {
  console.log('Starting application...');
  console.log(`Listening on port ${process.env.PORT ?? 3000}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
