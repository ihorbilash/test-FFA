import { Injectable, Logger } from '@nestjs/common';

import { RequestRepository } from '@app/repository/request.repository';
import { QUEUE_EXCHANGE, RabbitMessage, RabbitRoutingKey } from '@app/common';
import { MessageService } from '@app/message';

import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly messageService: MessageService,
  ) {}

  /** Create a new request and publish a message to the queue */
  async create(createRequestDto: CreateRequestDto) {
    const request = await this.requestRepository.create({
      data: createRequestDto,
    });
    const message: RabbitMessage = { requestId: request.id };
    this.logger.log(
      `Created request and publish message: ${JSON.stringify(message)}`,
    );
    this.messageService.publishMessageToRoutingKeyWithDelay({
      exchange: QUEUE_EXCHANGE,
      routingKey: RabbitRoutingKey.TO_IN_PROGRESS,
      msg: message,
    });

    return request;
  }

  /** Find and return all requests */
  async findAll() {
    return this.requestRepository.find();
  }
}
