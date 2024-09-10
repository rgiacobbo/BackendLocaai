import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from 'src/db/entities/rating.entity';
import { Repository } from 'typeorm';
import { RatingDto } from './rating.dto';
import { RealtyEntity } from 'src/db/entities/realty.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  async findAll() {
    const rating = await this.ratingRepository.find();

    return rating;
  }

  async findById(id: string) {
    const userFound = await this.ratingRepository.findOne({
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

  async create(ratingDto: RatingDto, realtyIdParam: string) {
    const dbRating = new RatingEntity();
    dbRating.comment = ratingDto.comment;
    dbRating.grade = ratingDto.grade;
    dbRating.userId = ratingDto.userId;
    dbRating.realtyId = { id: realtyIdParam } as RealtyEntity;

    const { id, comment, grade, userId, realtyId } =
      await this.ratingRepository.save(dbRating);
    return { id, comment, grade, userId, realtyId };
  }

  async update(id: string, ratingDto: RatingDto) {
    const foundTask = await this.ratingRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.ratingRepository.update(id, this.mapDtoToEntity(ratingDto));
  }

  async remove(id: string) {
    const result = await this.ratingRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Realty with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapDtoToEntity(ratingDto: RatingDto): Partial<RatingEntity> {
    return {
      comment: ratingDto.comment,
      userId: ratingDto.userId,
      grade: ratingDto.grade,
    };
  }
}
