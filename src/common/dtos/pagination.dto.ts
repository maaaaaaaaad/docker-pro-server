import { IsNumber, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationInputDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Page count',
    format: 'number',
    default: 1,
    type: Number,
  })
  page: number
}
