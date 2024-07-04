import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserPayload } from './dtos/create-user.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(createUserPayload: CreateUserPayload): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserPayload.password, 10);
        const createdUser = new this.userModel({
            ...createUserPayload,
            password: hashedPassword,
        });
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }
}
