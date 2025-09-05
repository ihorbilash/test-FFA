import { Module } from '@nestjs/common';

import { RepositoryModule } from '@app/repository';

import { RequestModule } from './request/request.module';

@Module({
  imports: [RequestModule, RepositoryModule],
})
export class AppModule {}
