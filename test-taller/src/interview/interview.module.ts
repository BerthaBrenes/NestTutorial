import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewRepository } from './interview.repository';

@Module({
  providers: [InterviewService],
  controllers: [InterviewController],
  imports: [TypeOrmModule.forFeature([InterviewRepository])]
})
export class InterviewModule {}
