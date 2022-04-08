import { Column, Entity, OneToMany } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { IsEnum } from 'class-validator'
import { ItemEntity } from './item.entity'

export enum CategoryValues {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Entity({ name: 'CATEGORY' })
export class CategoryEntity extends CoreEntity {
  @Column({ name: 'VALUE', enum: CategoryValues, nullable: false })
  @IsEnum(CategoryValues)
  value: CategoryValues

  @OneToMany(() => ItemEntity, (item) => item.category)
  items: ItemEntity[]
}
