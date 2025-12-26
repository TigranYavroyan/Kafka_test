import { Controller } from '@nestjs/common';
import { AppService, User } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.get.all')
  getAllUsers(): Array<User> {
    return this.appService.getUsers();
  }
}
