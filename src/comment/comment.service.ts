import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { CommentRegisterInputDto } from './dtos/comment.register.dto'
import { UserEntity } from '../auth/entities/user.entity'
import { ItemEntity } from '../item/entities/item.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly comment: Repository<CommentEntity>,
    @InjectRepository(ItemEntity) private readonly item: Repository<ItemEntity>,
  ) {}

  async register(
    owner: UserEntity,
    { itemId, content }: CommentRegisterInputDto,
  ) {
    try {
      const item = await this.item.findOne({
        where: {
          pk: itemId,
        },
      })
      if (!item) {
        return {
          access: false,
          message: 'Not found item',
        }
      }
      const comment = await this.comment.create({
        content,
      })
      comment.owner = owner
      comment.item = item
      await this.comment.save(comment)
      return {
        access: true,
        message: 'Success register comment',
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message)
    }
  }
}
