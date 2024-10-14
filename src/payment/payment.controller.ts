import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaymentDto } from './payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.paymentService.findById(id).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }

  // @UseGuards(AuthGuard)
  // @Get('/user:id')
  // findByUserAndAll(@Param('id') id) {
  //   return this.paymentService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.realty);
  //   });
  // }

  @UseGuards(AuthGuard)
  @Post()
  create(@Param('id') id, @Body() paymentDto: PaymentDto) {
    if (!id) {
      throw new Error('Payment ID is undefined');
    }
    console.log('Realty ID:', id);
    return this.paymentService.create(paymentDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id, @Body() paymentDto: PaymentDto) {
    return this.paymentService.update(id, paymentDto).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.paymentService.remove(id).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }
}
