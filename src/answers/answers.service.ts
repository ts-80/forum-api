import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {

  

  constructor(private readonly prisma: PrismaService){}
  
  create(createAnswerDto: CreateAnswerDto, user: any, questionId: number) {
    const userId = user.sub;
    console.log('Creating answer for user:', userId);

    return this.prisma.answers.create({
      data: {
        ...createAnswerDto, userId, questionId
      }
    });
  }

  findAll() {
    return this.prisma.answers.findMany();
  }

  findOne(id: number) {
    return this.prisma.answers.findUnique({
      where: { id }
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answers.update({
      where: { id },
      data: { ...updateAnswerDto }
    });
  }

  remove(id: number) {
    return this.prisma.answers.delete({
      where: { id }
    });
  }
}
