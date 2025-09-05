import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/prisma';

import { RequestRepository } from './request.repository';

@Module({
  imports: [PrismaModule],
  providers: [RequestRepository],
  exports: [RequestRepository],
})
export class RepositoryModule {}
