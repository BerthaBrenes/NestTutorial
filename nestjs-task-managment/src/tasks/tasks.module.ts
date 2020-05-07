import { Module, Get } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { get } from 'http';
/**
 * Module for the tasks module
 */
@Module({
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
