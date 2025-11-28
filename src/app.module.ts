import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    QuestionsModule,
    AnswersModule],
    providers: [{
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
      
    ],
})
export class AppModule {}