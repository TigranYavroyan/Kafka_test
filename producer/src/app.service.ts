import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('KAFKA_PRODUCER') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    this.kafka.subscribeToResponseOf('user.get.all');
    await this.kafka.connect();
  }

  async getUsers(): Promise<User[]> {
    // send<TResponse, TRequest>
    const obs = this.kafka.send<User[], object>('user.get.all', {});
    return await firstValueFrom(obs.pipe(timeout(5000)));
  }
}
