import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertisingEntity } from 'src/db/entities/advertising.entity';
import { Repository } from 'typeorm';
import { AdvertisingDto } from './advertising.dto';
import { RealtyEntity } from 'src/db/entities/realty.entity';

@Injectable()
export class AdvertisingService {
  constructor(
    @InjectRepository(AdvertisingEntity)
    private readonly advertisingRepository: Repository<AdvertisingEntity>,
  ) {}

  async findAll() {
    const realty = await this.advertisingRepository.find();

    return realty;
  }

  async findById(id: string) {
    const userFound = await this.advertisingRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new HttpException(
        `Advertising with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userFound;
  }

  async create(advertisingDto: AdvertisingDto, id: RealtyEntity) {
    const dbAdvertising = new AdvertisingEntity();
    dbAdvertising.description = advertisingDto.description;
    dbAdvertising.dateStart = advertisingDto.dateStart;
    dbAdvertising.dateEnd = advertisingDto.dateEnd;
    dbAdvertising.value = advertisingDto.value;
    dbAdvertising.realtyId = id;

    const { realtyId, description, dateStart, dateEnd, value } =
      await this.advertisingRepository.save(dbAdvertising);
    return { realtyId, description, dateStart, dateEnd, value };
  }

  async update(id: string, advertisingDto: AdvertisingDto) {
    const foundTask = await this.advertisingRepository.findOne({
      where: { id },
    });

    if (!foundTask) {
      throw new HttpException(
        `Advertising with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.advertisingRepository.update(
      id,
      this.mapDtoToEntity(advertisingDto),
    );
  }

  async remove(id: string) {
    const result = await this.advertisingRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Advertising with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapDtoToEntity(
    advertisingDto: AdvertisingDto,
  ): Partial<AdvertisingEntity> {
    return {
      description: advertisingDto.description,
      dateStart: advertisingDto.dateStart,
      dateEnd: advertisingDto.dateEnd,
      value: advertisingDto.value,
      id: advertisingDto.id,
    };
  }
}
