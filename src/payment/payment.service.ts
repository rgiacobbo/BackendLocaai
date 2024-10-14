import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/db/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDto } from './payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async findAll() {
    const realty = await this.paymentRepository.find();

    return realty;
  }

  async findById(id: string) {
    const userFound = await this.paymentRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new HttpException(
        `Payment with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userFound;
  }

  async create(paymentsDto: PaymentDto) {
    const dbPayment = new PaymentEntity();
    dbPayment.amountPaid = paymentsDto.amountPaid;
    dbPayment.typePayment = paymentsDto.typePayment;
    dbPayment.tax = paymentsDto.tax;

    const { id, amountPaid, typePayment, tax } =
      await this.paymentRepository.save(dbPayment);
    return { id, amountPaid, typePayment, tax };
  }

  async update(id: string, paymentsDto: PaymentDto) {
    const foundTask = await this.paymentRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.paymentRepository.update(id, this.mapDtoToEntity(paymentsDto));
  }

  async remove(id: string) {
    const result = await this.paymentRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapDtoToEntity(paymentsDto: PaymentDto): Partial<PaymentEntity> {
    return {
      amountPaid: paymentsDto.amountPaid,
      typePayment: paymentsDto.typePayment,
      tax: paymentsDto.tax,
      id: paymentsDto.id,
    };
  }
}
