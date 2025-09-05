import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new request',
    description: 'Creates a new request and sends it to queue for processing',
  })
  @ApiBody({ type: CreateRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Request successfully created and queued',
    schema: {
      example: {
        id: 29,
        text: 'New feature implementation 12344566645636346436363',
        status: 'new',
        createdAt: '2025-09-05T09:53:55.028Z',
        updatedAt: '2025-09-05T09:53:55.028Z',
      },
    },
  })
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all requests',
    description: 'Retrieves a list of all requests with pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of requests retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 1,
            text: 'New feature implementation',
            status: 'new',
            createdAt: '2025-09-04T18:18:32.391Z',
            updatedAt: '2025-09-04T18:18:32.391Z',
          },
          {
            id: 2,
            text: 'test message',
            status: 'new',
            createdAt: '2025-09-04T18:23:07.862Z',
            updatedAt: '2025-09-04T18:23:07.862Z',
          },
        ],
      },
    },
  })
  findAll() {
    return this.requestService.findAll();
  }
}
