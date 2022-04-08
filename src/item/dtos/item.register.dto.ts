import { ApiProperty, PickType } from '@nestjs/swagger'
import { ItemEntity } from '../entities/item.entity'
import { CategoryValues } from '../entities/category.entity'

export class ItemRegisterInputDto extends PickType(ItemEntity, [
  'subject',
  'description',
  'price',
]) {
  @ApiProperty({
    description: 'Category values. please you select that buy or sell',
    enum: CategoryValues,
    nullable: false,
    required: true,
    example: `${CategoryValues.BUY} || ${CategoryValues.SELL}`,
  })
  categoryValue: CategoryValues
}
