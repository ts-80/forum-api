import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;

    signin(params: Prisma.UserCreateInput) {
        const user = this.userService.user({ email: params.email });
        if (!user) new NotFoundException('User not found'); 
    }
}