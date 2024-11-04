import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { RealtyDto } from 'src/realty/realty.dto';

export class FilterDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  nameFilter: string[];
  realtyId:RealtyDto
}

export interface Filter {
  id: string;
  nameFilter: string;
}
