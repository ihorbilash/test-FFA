import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@app/repository/base/base.repository';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class RequestRepository extends BaseRepository<
  typeof PrismaService.prototype.request
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.request);
  }
}
