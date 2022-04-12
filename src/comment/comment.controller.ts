import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { CommentRegisterInputDto } from './dtos/comment.register.dto'
import { User } from '../common/decorators/user.decorator'
import { UserEntity } from '../auth/entities/user.entity'
import { CommentService } from './comment.service'

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CommentRegisterInputDto })
  async register(
    @Body() commentRegisterInputDto: CommentRegisterInputDto,
    @User() user: UserEntity,
  ) {
    return await this.commentService.register(user, commentRegisterInputDto)
  }
}
