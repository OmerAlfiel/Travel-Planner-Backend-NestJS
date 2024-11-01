// src/services/review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(reviewData: Partial<Review>): Promise<Review> {
    const review = this.reviewRepository.create(reviewData);
    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findByDestinationId(destinationId: number): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({ where: { destination: { id: destinationId } } });
    if (!reviews.length) {
      throw new NotFoundException(`No reviews found for destination ID ${destinationId}`);
    }
    return reviews;
  }

  async findById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }
}
