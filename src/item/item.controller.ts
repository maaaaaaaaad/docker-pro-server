import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ItemService } from './item.service'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../common/decorators/user.decorator'
import { UserEntity } from '../auth/entities/user.entity'
import { ItemRegisterInputDto } from './dtos/item.register.dto'

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Register user item',
  })
  @ApiBody({
    type: ItemRegisterInputDto,
  })
  async register(
    @User() user: UserEntity,
    @Body() itemRegisterInputDto: ItemRegisterInputDto,
  ) {
    return await this.itemService.register(user, itemRegisterInputDto)
  }
}
