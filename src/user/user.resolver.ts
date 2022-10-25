import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { APIOutput } from 'src/common/dtos/Core-Output.dto';
import { LoginInput, LoginOutputDTO } from './dto/user.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => APIOutput)
  createUser(@Args('input') createUserInput: CreateUserInput): Promise<APIOutput> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginOutputDTO)
  login(@Args("input") input: LoginInput): Promise<LoginOutputDTO> {
    return this.userService.login(input);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Query(() => User)
  @Role(["Any"])
  me(@AuthUser() user: User) {
    return user;
  }
}
