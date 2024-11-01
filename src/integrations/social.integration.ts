import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';

@Injectable()
export class SocialIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async shareOnFacebook(message: string, link: string): Promise<any> {
    const response = await this.httpService.post('https://graph.facebook.com/me/feed', {
      message,
      link,
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    }).toPromise();
    return response.data;
  }

  async shareOnTwitter(status: string): Promise<any> {
    const response = await this.httpService.post('https://api.twitter.com/1.1/statuses/update.json', {
      status,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }).toPromise();
    return response.data;
  }
}