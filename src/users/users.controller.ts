import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.usersService.findById(id).catch((e) => {
      throw new NotFoundException(e.user);
    });
  }

  @ApiBody({ type: [UserDto] })
  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @ApiBearerAuth()
  @ApiBody({ type: [UserDto] })
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @Put(':id')
  update(@Param('id') id, @Body() userDto: UserDto) {
    return this.usersService.update(id, userDto).catch((e) => {
      throw new NotFoundException(e.user);
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param('id') id) {
    return this.usersService.remove(id).catch((e) => {
      throw new NotFoundException(e.user);
    });
  }
}
