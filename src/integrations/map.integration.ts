import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async getRoute(origin: string, destination: string): Promise<any> {
    const response = await this.httpService.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }).toPromise();
    return response.data;
  }

  async getPOIs(location: string, radius: number, type: string): Promise<any> {
    const response = await this.httpService.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location,
        radius,
        type,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }).toPromise();
    return response.data;
  }
}