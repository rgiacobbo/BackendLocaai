import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/db/entities/location.entity';
import { Repository } from 'typeorm';
import { LocationDto } from './location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}
  async findAll() {
    const realty = await this.locationRepository.find();
    return realty;
  }
  async findById(id: string) {
    const userFound = await this.locationRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      throw new HttpException(
        `Location with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userFound;
  }
  // async create(locationDto: LocationDto, user: string) {
  //   const dbLocation = new LocationEntity();
  //   dbLocation.dateStart = locationDto.dateStart;
  //   dbLocation.dateEnd = locationDto.dateEnd;
  //   dbLocation.userId = { id: user } as UserEntity;
  //   const { id,  } =
  //     await this.locationRepository.save(dbLocation);
  //   return { id,  };
  // }
  // async update(id: string, locationDto: LocationDto) {
  //   const foundLocation = await this.locationRepository.findOne({
  //     where: { id },
  //   });
  //   if (!foundLocation) {
  //     throw new HttpException(
  //       `Location with id '${id}' not found`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   await this.locationRepository.update(id, this.mapDtoToEntity(locationDto));
  // }
  async remove(id: string) {
    const result = await this.locationRepository.delete(id);
    if (!result.affected) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // private mapDtoToEntity(locationDto: LocationDto): Partial<LocationEntity> {
  //   return {
  //     userId: locationDto.userId,
  //     value: locationDto.value,
  //     description: realtyDto.description,
  //     date: realtyDto.date,
  //     capacity: realtyDto.capacity,
  //   };
  // }
}
