import { Body, Controller, Get, Req, Res } from '@nestjs/common';

@Controller('user')
export class UserController {
@Get()
async findOne(@Req() request:any) {
  
    let message = request.body;
  
    console.log(message);


    return {
        message: message ,
    };
}

}