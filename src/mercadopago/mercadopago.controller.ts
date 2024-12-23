import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import { AppService } from './mercadopago.service';
import { MercadoPagoDTO } from './mercadopago';

@Controller('mercadopago')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async mercadoPago(@Body() body): Promise<any> {
    try {
      //save webhook body to file
      await fs.writeFile(
        `${new Date().toISOString()}-mercado-pago.json`,
        JSON.stringify(body),
      );
    } catch (error) {
      console.log(error);
    }

    return body;
  }

  @Get('/generate-payment-link')
  async generatePaymentLink(
    @Query('id') id: string,           // Obtendo o ID via query string
    @Query('title') title: string,     // Obtendo o título via query string
    @Query('price') price: string,
  ): Promise<any> {
    const mercadoPagoDTO: MercadoPagoDTO = { 
      id, 
      title, 
      price: parseFloat(price), // Converte para número
    };
  
    if (isNaN(mercadoPagoDTO.price)) {
      throw new Error('O preço fornecido não é um número válido.');
    }
  
    return await this.appService.generatePaymentLink(mercadoPagoDTO);
  
  }

  @Get('/get-payments')
  async getPayments(): Promise<any> {
    return (await this.appService.getPayments()).data;
  }
}
