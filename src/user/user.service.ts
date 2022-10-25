import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { Repository } from "typeorm"
import { APIOutput } from 'src/common/dtos/Core-Output.dto';
import { LoginInput, LoginOutputDTO } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async create(input: CreateUserInput): Promise<APIOutput> {
    try {

      const user = this.userRepo.create(input);
      await this.userRepo.save(user);
      return {
        ok: true,
        msg: "User created successfully!!!"
      };

    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: "Something went wrong !!!"
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutputDTO> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: "User does not exist!!!"
        };
      }
      if (await user.comparePassword(password)) {
        return {
          ok: true,
          result: this.jwtService.sign({ id: user.id, role: user.role })
        };
      }
      return {
        ok: false,
        error: "Wrong password !!!"
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id: id
      }
    });
  }
}
