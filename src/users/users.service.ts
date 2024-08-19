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
  }
}
