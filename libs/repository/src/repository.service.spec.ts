import { Test, TestingModule } from '@nestjs/testing';
import { RequestRepository } from './request.repository';

describe('RequestRepository', () => {
  let service: RequestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestRepository],
    }).compile();

    service = module.get<RequestRepository>(RequestRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
