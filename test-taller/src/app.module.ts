import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from './interview/interview.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InterviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
