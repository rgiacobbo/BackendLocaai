<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { UserDto, User } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  public users: User[] = [
    {
      id: '1',
      name: 'Ricardo',
      password: 'giacobbo',
      phone: '9999-9999',
      email: 'rgiacobbofilho@gmail.com',
      cpf: '123456789',
      city: 'Maringa',
    },
  ];

  findAll() {
    return this.users.filter(Boolean);
  }

  async findById(id: string) {
    const user = this.users.find((u) => u?.id === id);

    if (!user) {
      throw Error(`Usuário com o ID ${id} não encontrada.`);
    }
    return user;
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find((user) => user.name === username);
  }

  create(userDto: UserDto) {
    const id = uuid();
    userDto.password = bcryptHashSync(userDto.password, 10);
    const user: User = {
      id,
      ...userDto,
    };
    this.users.push(user);

    return user;
  }

  async update(id: string, userDto: UserDto) {
    const index = this.users.findIndex((user) => user?.id === id);
    if (index < 0) {
      throw Error(`Usuário com o ID ${id} não encontrada.`);
    }
    const user: User = {
      id,
      ...userDto,
    };
    this.users[index] = user;
    return user;
  }

  async remove(id: string) {
    const index = this.users.findIndex((user) => user?.id === id);
    if (index < 0) {
      throw Error(`Usuário com o ID ${id} não encontrada.`);
    }
    delete this.users[index];
    return true;
=======
import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto, User } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findById(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {id}
    })

    delete userFound.password;

    if (!userFound) {
      throw Error(`Usuário com o ID ${id} não encontrada.`);
    }
    return userFound;
  }

  async findByUserName(name: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: {name}
    })

    if(!userFound){
      return null;
    }

    return {
      id: userFound.id,
      name: userFound.name,
      password: userFound.password,
      ...userFound
    }

  }

  async create(userDto: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(userDto.name);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${userDto.name}' already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.name = userDto.name;
    dbUser.password = bcryptHashSync(userDto.password, 10);
    dbUser.phone = userDto.phone;
    dbUser.email = userDto.email;
    dbUser.cpf = userDto.cpf;
    dbUser.city = userDto.city;

    const { id, name, phone, email, cpf, city } = await this.userRepository.save(dbUser);
    return { id, name, phone, email, cpf, city};
  }

  //Update ainda ta dando pau. Tenque ver sobre a questão dos DTOS
  async update(id: string, userDto: UserDto) {
    const foundTask = await this.userRepository.findOne({ where: { id } })

    if (!foundTask) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.update(id, this.mapDtoToEntity(userDto));
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id)

    if (!result.affected) {
      throw new HttpException(
        `Task with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      password: userEntity.password,
      email: userEntity.email,
      city: userEntity.city,
      phone: userEntity.phone,
      cpf: userEntity.cpf
    }
  }

  private mapDtoToEntity(userDto: UserDto): Partial<UserEntity> {
    return {
      name: userDto.name,
      password: userDto.password,
      email: userDto.email,
      city: userDto.city,
      phone: userDto.phone,
      cpf: userDto.cpf
    }
>>>>>>> 3c705c6 (CRUD realty)
  }
}
