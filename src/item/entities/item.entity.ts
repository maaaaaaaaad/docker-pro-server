import { Column, Entity, ManyToOne } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { CategoryEntity } from './category.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { UserEntity } from '../../auth/entities/user.entity'

@Entity({ name: 'ITEM' })
export class ItemEntity extends CoreEntity {
  @ManyToOne(() => CategoryEntity, (category) => category.items)
  category: CategoryEntity

  @Column({ name: 'SUBJECT', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  subject: string

  @Column({ name: 'COVER_IMAGE', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  coverImage: string

  @Column({ name: 'DESCRIPTION', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  description: string

  @Column({ name: 'PRICE', nullable: false, type: Number })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ManyToOne(() => UserEntity, (user) => user.items, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity
}
