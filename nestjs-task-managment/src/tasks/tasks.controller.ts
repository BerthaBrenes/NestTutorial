import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, Taskstatus } from './tasks.model';
import {CreateTaskDto} from './dto/create.task.dto';
import { identity } from 'rxjs';
import { timingSafeEqual } from 'crypto';
import { pathToFileURL } from 'url';
import { GetTasksFiltersDto } from './dto/get.tasks.filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){ }
  /**
   * Function that call the service for get the tasks
   * With the get request   
   * @param filterDto a filter for the Query
   */
  @Get()
  getTasks(@Query() filterDto: GetTasksFiltersDto): Tasks[]{
    if(Object.keys(filterDto).length){
        return this.taskService.getTasksWithFilters(filterDto);
    }
    else{
        return this.taskService.getAllTasks();
    }
    
  }

  /**
   * Get the information of a task by Id
   * @param id the id of the task
   */
  @Get('/:id')
  getTaskById( @Param('id') id: string): Tasks{
    return this.taskService.getTaskById(id);
  }
  /**
   * Method to Post a new task
   * @param Body the body data of the tasks, it doesn't made a filter for the body
   * @param Title if its more specify with the name of the tasks that will be better
   * @param description Description of the task
   */
  @Post()
  createTask( @Body() createTaskDto: CreateTaskDto) : Tasks{
    return this.taskService.createTasks(createTaskDto);
  }
  /**
   * Update the status of the task
   * @param id id of the task
   * @param status the new status of the task
   */
  @Patch('/:id/status')
  updateTaskStatus(
      @Param('id') id:string,
      @Body('status') status: Taskstatus) : Tasks{
          return this.taskService.updateTaskStatus(id, status);
    }
      
    /**
   * Delete a task
   * @param id id of the task to delete
   */
  @Delete('/:id')
  deleteTask( 
      @Param('id') id: string): void {
    this.taskService.deleteTaskById(id);
  }
}
