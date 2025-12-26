import { Controller, Get } from '@nestjs/common';
import { AppService, User } from './app.service';

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.appService.getUsers();
  }
}
