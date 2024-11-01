import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserService } from './services/user.service';
import { DestinationService } from './services/destination.service';
import { POIService } from './services/point-of-interest.service';
import { ItineraryService } from './services/itinerary.service';
import { BookingService } from './services/booking.service';
import { ReviewService } from './services/review.service';
import { ExpenseService } from './services/expense.service';
import { CommunityService } from './services/community.service';
import { UserController } from './controllers/user.controller';
import { DestinationController } from './controllers/destination.controller';
import { POIController } from './controllers/point-of-interest.controller';
import { ItineraryController } from './controllers/itinerary.controller';
import { BookingController } from './controllers/booking.controller';
import { ReviewController } from './controllers/review.controller';
import { ExpenseController } from './controllers/expense.controller';
import { CommunityController } from './controllers/community.controller';
import { User } from './entities/user.entity';
import { Destination } from './entities/destination.entity';
import { PointOfInterest } from './entities/point-of-interest.entity';
import { Itinerary } from './entities/itinerary.entity';
import { Booking } from './entities/booking.entity';
import { Review } from './entities/review.entity';
import { Expense } from './entities/expense.entity';
import { Community } from './entities/community.entity';
import { BookingIntegrationService } from './integrations/booking.integration';
import { MapIntegrationService } from './integrations/map.integration';
import { SocialIntegrationService } from './integrations/social.integration';
console.log('Entities:', [User, Destination, PointOfInterest, Itinerary, Booking, Review, Expense, Community]);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Destination, PointOfInterest, Itinerary, Booking, Review, Expense, Community]),
    AuthModule,
    HttpModule,
  ],
  providers: [
    UserService,
    DestinationService,
    POIService,
    ItineraryService,
    BookingService,
    ReviewService,
    ExpenseService,
    CommunityService,
    BookingIntegrationService,
    MapIntegrationService,
    SocialIntegrationService,
  ],
  controllers: [
    UserController,
    DestinationController,
    POIController,
    ItineraryController,
    BookingController,
    ReviewController,
    ExpenseController,
    CommunityController,
  ],
})
export class AppModule {}