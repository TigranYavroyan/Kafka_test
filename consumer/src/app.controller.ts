import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import type { User } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.get.all')
  getAllUsers(): User[] {
    return this.appService.getUsers();
  }

  @EventPattern('user.created')
  createUser(@Payload() user: User) {
    console.log('The user created succesfully:', user);
    return this.appService.addUser(user);
  }
}
