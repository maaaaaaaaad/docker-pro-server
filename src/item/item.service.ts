import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemEntity } from './entities/item.entity'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import {
  ItemRegisterInputDto,
  ItemRegisterOutputDto,
} from './dtos/item.register.dto'
import { UserEntity } from '../auth/entities/user.entity'
import { CategoriesGetOutputDto } from './dtos/categories.get.dto'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async register(
    owner: UserEntity,
    {
      categoryValue,
      subject,
      description,
      coverImage,
      price,
    }: ItemRegisterInputDto,
  ): Promise<ItemRegisterOutputDto> {
    try {
      const item = await this.itemEntity.create({
        subject,
        description,
        coverImage,
        price,
      })
      item.owner = owner
      let category = await this.categoryEntity.findOne({ value: categoryValue })
      if (!category) {
        category = await this.categoryEntity.save(
          this.categoryEntity.create({ value: categoryValue }),
        )
      }
      item.category = category
      await this.itemEntity.save(item)
      return {
        access: true,
        message: 'Success register item',
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message)
    }
  }

  async categories(): Promise<CategoriesGetOutputDto> {
    try {
      const categories = await this.categoryEntity.find({
        relations: ['items'],
      })
      return {
        access: true,
        message: 'Success',
        categories,
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message)
    }
  }
}
