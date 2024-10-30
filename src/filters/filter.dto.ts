import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty()
  nameFilter: string;
}

export interface Filter {
  id: string;
  nameFilter: string;
}
