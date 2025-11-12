import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../../../common/dto/auth/create-user.dto';
import { UserRto } from '../../../common/dto/auth/user.rto';

@Injectable()
export class GatewayService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  registerUser(dto: CreateUserDto): Promise<UserRto> {
    return firstValueFrom(
      this.authClient.send<UserRto>({ cmd: 'auth_register' }, dto),
    );
  }

  getUsers(): Promise<UserRto[]> {
    return firstValueFrom(
      this.authClient.send<UserRto[]>({ cmd: 'auth_get_users' }, {}),
    );
  }
}
