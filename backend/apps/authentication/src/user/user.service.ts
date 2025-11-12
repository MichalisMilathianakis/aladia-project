import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../../../../common/dto/auth/create-user.dto';
import { UserRto } from '../../../../common/dto/auth/user.rto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private toRto(user: any): UserRto {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async register(dto: CreateUserDto): Promise<UserRto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
    });

    return this.toRto(user);
  }

  async listUsers(): Promise<UserRto[]> {
    const users = await this.userRepository.findAll();
    return users.map(u => this.toRto(u));
  }
}
