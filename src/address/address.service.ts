import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/db/entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async findAll() {
    const realty = await this.addressRepository.find();

    return realty;
  }

  async findById(id: string) {
    const userFound = await this.addressRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new HttpException(
        `Address with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userFound;
  }

  async create(addressDto: AddressDto, idrealty: string) {
    const dbAddress = new AddressEntity();
    dbAddress.street = addressDto.street;
    dbAddress.city = addressDto.city;
    dbAddress.number = addressDto.number;
    dbAddress.state = addressDto.state;
    dbAddress.id = idrealty;

    const { id, street, city, number, state } =
      await this.addressRepository.save(dbAddress);
    return { id, street, city, number, state };
  }

  async update(id: string, addressDto: AddressDto) {
    const foundTask = await this.addressRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.addressRepository.update(id, this.mapDtoToEntity(addressDto));
  }

  async remove(id: string) {
    const result = await this.addressRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapDtoToEntity(addressDto: AddressDto): Partial<AddressEntity> {
    return {
      street: addressDto.street,
      city: addressDto.city,
      number: addressDto.number,
      state: addressDto.state,
      id: addressDto.id,
    };
  }
}
