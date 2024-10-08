import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealtyEntity } from 'src/db/entities/realty.entity';
import { Repository } from 'typeorm';
import { RealtyDto } from './realty.dto';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(RealtyEntity)
    private readonly realtyRepository: Repository<RealtyEntity>,
  ) {}

  async findAll() {
    const realty = await this.realtyRepository.find();

    return realty;
  }

  async findById(id: string) {
    const userFound = await this.realtyRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userFound;
  }

  async create(realtyDto: RealtyDto, user: string) {
    const dbRealty = new RealtyEntity();
    dbRealty.title = realtyDto.title;
    dbRealty.value = realtyDto.value;
    dbRealty.description = realtyDto.description;
    dbRealty.date = realtyDto.date;
    dbRealty.capacity = realtyDto.capacity;
    dbRealty.userId = { id: user } as UserEntity;

    const { id, title, value, description, date, capacity, userId } =
      await this.realtyRepository.save(dbRealty);
    return { id, title, value, description, date, capacity, userId };
  }

  async update(id: string, realtyDto: RealtyDto) {
    const foundTask = await this.realtyRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.realtyRepository.update(id, this.mapDtoToEntity(realtyDto));
  }

  async remove(id: string) {
    const result = await this.realtyRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapDtoToEntity(realtyDto: RealtyDto): Partial<RealtyEntity> {
    return {
      title: realtyDto.title,
      userId: realtyDto.userId,
      value: realtyDto.value,
      description: realtyDto.description,
      date: realtyDto.date,
      capacity: realtyDto.capacity,
    };
  }
}
