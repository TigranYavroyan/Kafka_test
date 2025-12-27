import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService} from './app.service';
import type { User } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.appService.getUsers();
  }

  @Post()
  async createUser(@Body() body: User) {
    await firstValueFrom(this.appService.emitUserCreated(body));
    return { ok: true };
  }
}
