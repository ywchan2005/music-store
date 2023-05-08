import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageQueue } from './notifier.constants';
import { NotifierController } from './notifier.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: MessageQueue.ID,
      transport: Transport.REDIS,
      options: {
        host: 'mq',
        port: 6379,
      },
    }]),
  ],
  // providers: [
  controllers: [
    NotifierController,
  ]
})
export class NotifierModule {}
