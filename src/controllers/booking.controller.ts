// src/controllers/booking.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from 'src/dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() bookingData: CreateBookingDto): Promise<Booking> {
    return this.bookingService.create(bookingData);
  }
  

  @Get(':userId')
  async getByUserId(@Param('userId') userId: number): Promise<Booking[]> {
    return this.bookingService.findByUserId(userId);
  }
  

}