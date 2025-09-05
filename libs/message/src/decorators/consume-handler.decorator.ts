import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

/** Decorator that wraps RabbitSubscribe */
export function ConsumerHandler({
  exchange,
  routingKey,
}: {
  exchange: string;
  routingKey: string;
}) {
  return RabbitSubscribe({
    exchange,
    routingKey,
    queueOptions: { durable: true },
  });
}
