import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BookingIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async searchFlights(query: any): Promise<any> {
    const response = await this.httpService.get('https://api.skyscanner.net/apiservices/pricing/v1.0', {
      params: query,
      headers: { 'API-Key': process.env.SKYSCANNER_API_KEY },
    }).toPromise();
    return response.data;
  }

  async searchHotels(query: any): Promise<any> {
    const response = await this.httpService.get('https://api.booking.com/v1/hotels', {
      params: query,
      headers: { 'API-Key': process.env.BOOKING_API_KEY },
    }).toPromise();
    return response.data;
  }

  async searchActivities(query: any): Promise<any> {
    const response = await this.httpService.get('https://api.booking.com/v1/activities', {
      params: query,
      headers: { 'API-Key': process.env.BOOKING_API_KEY },
    }).toPromise();
    return response.data;
  }
}