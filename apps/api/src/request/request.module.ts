import { Module } from '@nestjs/common';

import { RepositoryModule } from '@app/repository';
import { MessageModule, MessageService } from '@app/message';

import { RequestService } from './request.service';
import { RequestController } from './request.controller';

@Module({
  imports: [RepositoryModule, MessageModule],
  controllers: [RequestController],
  providers: [RequestService, MessageService],
})
export class RequestModule {}
