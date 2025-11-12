import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(data: Partial<User>) {
    const doc = new this.userModel(data);
    return doc.save();
  }

  findAll() {
    return this.userModel.find().lean().exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
