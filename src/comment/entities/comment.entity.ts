import { Column, Entity, ManyToOne } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { UserEntity } from '../../auth/entities/user.entity'
import { ItemEntity } from '../../item/entities/item.entity'

@Entity({ name: 'COMMENT' })
export class CommentEntity extends CoreEntity {
  @Column({ name: 'CONTENT' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  content: string

  @ManyToOne(() => UserEntity, (owner) => owner.comments, {
    onDelete: 'CASCADE',
    eager: true,
  })
  owner: UserEntity

  @ManyToOne(() => ItemEntity, (item) => item.comments, {
    onDelete: 'CASCADE',
    eager: true,
  })
  item: ItemEntity
}
