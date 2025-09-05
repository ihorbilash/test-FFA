import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { PublishMessageParams } from '@app/common';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);
  constructor(private readonly amqp: AmqpConnection) {}

  /**   * Publish message to exchange with routing key after delay
   * @param params - exchange, routingKey, msg
   * @param delayMs - delay by milliseconds (default: 5000ms)
   */
  async publishMessageToRoutingKeyWithDelay(
    params: PublishMessageParams,
    delayMs = 5000,
  ) {
    const { exchange, routingKey, msg } = params;
    this.logger.log(`Waiting ${delayMs}ms...`);
    await new Promise((r) => setTimeout(r, delayMs));
    await this.amqp.publish(exchange, routingKey, msg, {
      persistent: true,
    });
  }
}
