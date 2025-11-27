import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {

  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, user: any) {
    //to be replaced with actual user id from auth token
    // console.log('Creating question for user:', user.sub);
    // const payload = user.sub;
    //  const userId = payload.sub;

    return await this.prisma.questions.create({ data: { ...createQuestionDto, userId: user.sub.sub } });
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        answers: true,
        _count: { select: { answers: true } },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
    },
    );
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id }, include: {
        answers: true, user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const userId = 1; //to be replaced with actual user id from auth token
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({ where: { id } });
  }
}
