import { Module } from '@nestjs/common';
import { ImagensController } from './imagens.controller';
import { ImagensService } from './imagens.service';

@Module({
  controllers: [ImagensController],
  providers: [ImagensService],
  exports: [ImagensService],
})
export class ImagensModule {}
