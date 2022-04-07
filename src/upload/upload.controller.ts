import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '../common/utils/multer.options'

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('image', multerOptions('images')))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'To upload a single image file',
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
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    console.log(image)
  }
}
