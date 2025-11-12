import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from '../../../../common/dto/auth/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'auth_register' })
  register(dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @MessagePattern({ cmd: 'auth_get_users' })
  getUsers() {
    return this.userService.listUsers();
  }
}
