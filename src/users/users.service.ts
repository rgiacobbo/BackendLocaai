import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './user';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    const usersFinal = users.map((obj) => {
      const objCopy = { ...obj };
      delete objCopy.password;
      return objCopy;
    });
    return usersFinal;
  }

  async findById(id: string) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    delete userFound.password;

    if (!userFound) {
      throw Error(`Usuário com o ID ${id} não encontrada.`);
    }
    return userFound;
  }

  async findByUserName(name: string): Promise<UserEntity | null> {
    const userFound = await this.userRepository.findOne({
      where: { name },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      name: userFound.name,
      password: userFound.password,
      ...userFound,
    };
  }

  async create(userDto: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(userDto.name);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User '${userDto.name}' already registered`);
    }

    const dbUser = new UserEntity();
    dbUser.name = userDto.name;
    dbUser.password = bcryptHashSync(userDto.password, 10);
    dbUser.phone = userDto.phone;
    dbUser.email = userDto.email;
    dbUser.cpf = userDto.cpf;
    dbUser.city = userDto.city;
    dbUser.filterUser = userDto.filterUser ? String(userDto.filterUser) : '';

    const { id, name, phone, email, cpf, city, filterUser } =
      await this.userRepository.save(dbUser);
    return { id, name, phone, email, cpf, city, filterUser };
  }

  //Update ainda ta dando pau. Tenque ver sobre a questão dos DTOS
  async update(id: string, userDto: UserDto) {
    const foundTask = await this.userRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.update(id, this.mapDtoToEntity(userDto));
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // private mapEntityToDto(userEntity: UserEntity): UserDto {
  //   return {
  //     id: userEntity.id,
  //     name: userEntity.name,
  //     password: userEntity.password,
  //     email: userEntity.email,
  //     city: userEntity.city,
  //     phone: userEntity.phone,
  //     cpf: userEntity.cpf,
  //   };
  // }

  private mapDtoToEntity(userDto: UserDto): Partial<UserEntity> {
    return {
      name: userDto.name,
      password: userDto.password,
      email: userDto.email,
      city: userDto.city,
      phone: userDto.phone,
      cpf: userDto.cpf,
      filterUser: userDto.filterUser,
    };
  }
}
