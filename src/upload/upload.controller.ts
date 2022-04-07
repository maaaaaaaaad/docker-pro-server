import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '../common/utils/multer.options'

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  @Post('avatar')
  @UseInterceptors(FileInterceptor('image', multerOptions('images')))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'To upload a single avatar image file',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadAvatarImage(@UploadedFile() image: Express.Multer.File) {
    return {
      image: `http://localhost:${process.env.PORT}/media/images/${image.filename}`,
    }
  }
}
