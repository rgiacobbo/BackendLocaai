import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RealtyDto } from 'src/realty/realty.dto';

export class FilterDto {
  @ApiProperty()
  @IsString()
  nameFilter: string;
  realtyId:RealtyDto
}

export interface Filter {
  id: string;
  nameFilter: string;
}
