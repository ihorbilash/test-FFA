import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class CreateRequestDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({
    description: 'request text',
    example: 'New feature implementation',
  })
  text: string;
}
