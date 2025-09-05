import { Module } from '@nestjs/common';

import { RepositoryModule } from '@app/repository';
import { MessageModule, MessageService } from '@app/message';

import { WorkerService } from './worker.service';

@Module({
  imports: [RepositoryModule, MessageModule],
  providers: [WorkerService, MessageService],
})
export class WorkerModule {}
