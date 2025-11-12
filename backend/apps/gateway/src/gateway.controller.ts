import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from '../../../common/dto/auth/create-user.dto';
import { UserRto } from '../../../common/dto/auth/user.rto';

@Controller('auth')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<UserRto> {
    return this.gatewayService.registerUser(dto);
  }

  @Get('users')
  getUsers(): Promise<UserRto[]> {
    return this.gatewayService.getUsers();
  }
}
