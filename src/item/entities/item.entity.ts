import { Column, Entity, ManyToOne } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { CategoryEntity } from './category.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { UserEntity } from '../../auth/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'ITEM' })
export class ItemEntity extends CoreEntity {
  @ManyToOne(() => CategoryEntity, (category) => category.items, {
    onDelete: 'CASCADE',
    eager: true,
  })
  category: CategoryEntity

  @Column({ name: 'SUBJECT', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item subject',
    type: String,
    example: 'WMD',
    nullable: false,
    required: true,
  })
  subject: string

  @Column({ name: 'COVER_IMAGE', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item cover image',
    type: String,
    nullable: false,
    required: true,
    format: 'binary',
  })
  coverImage: string

  @Column({ name: 'DESCRIPTION', nullable: false, type: String })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item description',
    type: String,
    nullable: false,
    required: true,
    example: 'This book is...',
  })
  description: string

  @Column({ name: 'PRICE', nullable: false, type: Number })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item price',
    type: Number,
    example: 5000,
    nullable: false,
    required: true,
  })
  price: number

  @ManyToOne(() => UserEntity, (user) => user.items, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity
}
