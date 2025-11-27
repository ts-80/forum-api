import { Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe, } from '@nestjs/common';
import { Prisma, User as UserModel} from 'generated/prisma';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}

@Post()
async signupUser(
 @Body() userData: Prisma.UserCreateInput,
): Promise<UserModel> {
 return this.userService.createUser(userData);
}

@UseGuards(AuthGuard)
@Get(':id')
async getUserById(@Param('id', ParseIntPipe) id: number): Promise <Omit<UserModel, 'password'> | null> {
 return this.userService.user({ id });

}

@UseGuards(AuthGuard)
@Patch(':id')
async updateUser(
 @Param('id',ParseIntPipe) id: number,
 @Body() userData: Prisma.UserUpdateInput,
): Promise<UserModel> {
 return this.userService.updateUser({
   where: { id },
   data: userData,
 });
}

@UseGuards(AuthGuard)
@Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }

}