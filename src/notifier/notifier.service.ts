import { Controller, Injectable, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Ctx, RedisContext, Transport } from '@nestjs/microservices';
import { Channel } from './notifier.constants';

// @Injectable()
@Controller()
export class NotifierController {
  // private readonly logger = new Logger(NotifierService.name)
  public readonly logger = new Logger(NotifierController.name)

  // @EventPattern('user__logged_in')
  @EventPattern(Channel.UserLoggedIn)
  // async handleUserLoggedIn(data: Record<string, unknown>) {
  // async handleUserLoggedIn(data: any) {
  async handleUserLoggedIn(@Payload() data: any, @Ctx() context: RedisContext) {
    this.logger.log(`handleUserLoggedIn: [${context.getChannel()}] ${JSON.stringify(data)}`)
  }

  // @MessagePattern('user__logged_in')
  // async handleUserLoggedIn2(@Payload() data: any, @Ctx() context: RedisContext) {
  //   this.logger.log(`handleUserLoggedIn2: ${JSON.stringify(data)}`)
  // }
}
