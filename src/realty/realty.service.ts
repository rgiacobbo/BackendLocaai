import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealtyEntity } from 'src/db/entities/realty.entity';
import { Repository } from 'typeorm';
import { Realty, RealtyDto } from './realty.dto';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(RealtyEntity)
    private readonly realtyRepository: Repository<RealtyEntity>,
  ) {}

  async findAll() {
    const realty = await this.realtyRepository.find({ relations: ['userId'] });

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

  async findByUserId(userId: string) {
    const properties = await this.realtyRepository.find({
        where: { userId: { id: userId } }, // Especifica o ID dentro de um objeto UserEntity
        relations: ['userId'], // Inclui a relação com o usuário, caso necessário
    });

    if (properties.length === 0) {
        throw new HttpException(
            `No properties found for user with id '${userId}'`,
            HttpStatus.NOT_FOUND,
        );
    }

    return properties;
}

  async create(realtyDto: RealtyDto, user: string) {
    const dbRealty = new RealtyEntity();
    dbRealty.title = realtyDto.title;
    dbRealty.value = realtyDto.value;
    dbRealty.description = realtyDto.description;
    dbRealty.category = realtyDto.category;
    dbRealty.adress = realtyDto.adress;
    dbRealty.no = realtyDto.no;
    dbRealty.city = realtyDto.city;
    dbRealty.state = realtyDto.state;
    dbRealty.cep = realtyDto.cep;
    dbRealty.room = realtyDto.room;
    dbRealty.bathroom = realtyDto.bathroom;
    dbRealty.garage = realtyDto.garage;
    dbRealty.area = realtyDto.area;
    dbRealty.nameFilter = realtyDto.nameFilter;
    dbRealty.latitude = realtyDto.latitude ? String(realtyDto.latitude) : '';
    dbRealty.longitude = realtyDto.longitude ? String(realtyDto.longitude) : '';
    dbRealty.userId = { id: user } as UserEntity;

    const { id, title, value, description, category, adress, no, city, state, cep, room, bathroom, garage, area,nameFilter,  userId } =
      await this.realtyRepository.save(dbRealty);
    return { id, title, value, description, category, adress, no, city, state, cep, room, bathroom, garage, area,nameFilter, userId };
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

  async getProperties(category?: string): Promise<Realty[]> {
    // Se houver uma categoria, filtra as propriedades com essa categoria
    if (category) {
      return this.realtyRepository.find({
        where: { category },  // Filtro pela categoria
      });
    }
  
    // Se não houver categoria, retorna todas as propriedades
    return this.realtyRepository.find();
  }

  private mapDtoToEntity(realtyDto: RealtyDto): Partial<RealtyEntity> {
    return {
      title: realtyDto.title,
      userId: realtyDto.userId,
      value: realtyDto.value,
      description: realtyDto.description,
      category: realtyDto.category,
      adress: realtyDto.adress,
      no: realtyDto.no,
      city: realtyDto.city,
      state: realtyDto.state,
      cep: realtyDto.cep,
      room: realtyDto.room,
      bathroom: realtyDto.bathroom,
      garage: realtyDto.garage,
      area: realtyDto.area,
      nameFilter: realtyDto.nameFilter
    };
  }
}
