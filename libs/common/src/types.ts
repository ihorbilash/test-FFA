import { RabbitRoutingKey } from './enums';

export type RabbitMessage = {
  requestId: number;
};

export type PublishMessageParams = {
  exchange: string;
  routingKey: RabbitRoutingKey;
  msg: RabbitMessage;
};
