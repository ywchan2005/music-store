import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'mq',
      port: 6379,
    },
  })
  // await app.startAllMicroservices()
  app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();
