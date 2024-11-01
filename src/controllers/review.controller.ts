// src/controllers/review.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Review } from '../entities/review.entity';
import { CreateReviewDTO } from '../dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() reviewData: CreateReviewDTO): Promise<Review> {
    return this.reviewService.create(reviewData);
  }

  @Get(':destinationId')
  async getByDestinationId(@Param('destinationId') destinationId: number): Promise<Review[]> {
    return this.reviewService.findByDestinationId(destinationId);
  }
}
