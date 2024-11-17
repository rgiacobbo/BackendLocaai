import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './imagens.dto';
import { ImagensService } from './imagens.service';

@Controller('imagens')
export class ImagensController {
  constructor(private readonly imagensService: ImagensService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: FileDTO) {
    const result = await this.imagensService.upload(file);
    return result;
  }

  @Get('/:imageName')
async listUrl(@Param('imageName') imageName: string) {
    const result = await this.imagensService.listUrl(imageName);
    return result;
}

  @Get('/all')
  async listAll() {
    const result = await this.imagensService.listAll();
    return result;
  }
}
