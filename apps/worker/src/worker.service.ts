import { Injectable, Logger } from '@nestjs/common';

import { RequestRepository } from '@app/repository/request.repository';
import { QUEUE_EXCHANGE, RabbitRoutingKey, RequestStatus } from '@app/common';
import type { RabbitMessage } from '@app/common';
import { ConsumerHandler, MessageService } from '@app/message';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(
    private readonly messagingService: MessageService,
    private readonly requestRepository: RequestRepository,
  ) {}

  @ConsumerHandler({
    exchange: QUEUE_EXCHANGE,
    routingKey: RabbitRoutingKey.TO_IN_PROGRESS,
  })
  async handleMessageCreated(msg: RabbitMessage) {
    this.logger.log(
      `Received message to TO_IN_PROGRESS: ${JSON.stringify(msg)}`,
    );
    await this.requestRepository.update({
      where: { id: msg.requestId },
      data: { status: RequestStatus.in_progress, updatedAt: new Date() },
    });
    this.logger.log(
      `Saved status in_progress for request id: ${msg.requestId}`,
    );
    this.messagingService.publishMessageToRoutingKeyWithDelay({
      exchange: QUEUE_EXCHANGE,
      routingKey: RabbitRoutingKey.TO_DONE,
      msg,
    });
  }

  @ConsumerHandler({
    exchange: QUEUE_EXCHANGE,
    routingKey: RabbitRoutingKey.TO_DONE,
  })
  async handleMessageToDone(msg: RabbitMessage) {
    this.logger.log(`Received message to TO_DONE: ${JSON.stringify(msg)}`);
    await this.requestRepository.update({
      where: { id: msg.requestId },
      data: { status: RequestStatus.done, updatedAt: new Date() },
    });
    this.logger.log(`Saved status done for request id: ${msg.requestId}`);
  }
}
