import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Questions } from  '.questions.entity';

export class Answer {
  id: number; // Int @default(autoincrement()) @id
  body: string; // String
  createdAt: Date; // DateTime @default(now())
  updatedAt: Date; // DateTime @updatedAt
  userId: number; // Int
  questionId: number; // Int

  // relations (optional, populated when joined)
  user?: User;
  question?: Questions;

  constructor(partial?: Partial<Answer>) {
    Object.assign(this, partial);
  }
}