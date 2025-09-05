import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { QUEUE_EXCHANGE } from '@app/common/enums';

import { MessageService } from './message.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        exchanges: [{ name: QUEUE_EXCHANGE, type: 'topic' }],
        uri: config.get('RABBITMQ_URL'),
        connectionInitOptions: { wait: true },
      }),
    }),
  ],
  providers: [MessageService],
  exports: [MessageService, RabbitMQModule],
})
export class MessageModule {}
