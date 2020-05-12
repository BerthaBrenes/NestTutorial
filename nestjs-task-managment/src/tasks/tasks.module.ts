import { Module, Get } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { get } from 'http';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
/**
 * Module for the tasks module
 */
@Module({
  /**
   * Import the repository of the database
   */
  imports:[
    TypeOrmModule.forFeature([TaskRepository])
  ],
  /**
   * Controller for the handlers http
   */
  controllers: [TasksController],
  /**
   * Services
   */
  providers: [TasksService]
})
export class TasksModule {
  constructor(private taskService:TasksService){ }
  
}
