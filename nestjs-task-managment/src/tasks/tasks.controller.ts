import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, Taskstatus } from './tasks.model';
import {CreateTaskDto} from './dto/create.task.dto';
import { identity } from 'rxjs';
import { timingSafeEqual } from 'crypto';
import { pathToFileURL } from 'url';
import { GetTasksFiltersDto } from './dto/get.tasks.filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){ }
  /**
   * Function that call the service for get all the tasks or in the request call all the task with certain of specific status
   * or with a specify word in the Title or description
   * With the get request is also necessary to use the validation with the filters of DTO
   * and define that validation in the query calling the Validation Pipe
   * @param filterDto a filter for the Query
   */
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFiltersDto): Tasks[]{
    if(Object.keys(filterDto).length){
        return this.taskService.getTasksWithFilters(filterDto);
    }
    else{
        return this.taskService.getAllTasks();
    }
    
  }

  /**
   * Get the information of a task by Id
   * Here has a notFoundValidation, inside the class can have a custom message
   * @param id the id of the task
   */
  @Get('/:id')
  getTaskById( @Param('id') id: string): Tasks{
     
    return this.taskService.getTaskById(id);
  }
  /**
   * Method to Post a new task
   * Aqui se usa ese pipe para hacer validaciones
   * @param Body the body data of the tasks, it doesn't made a filter for the body
   * @param Title if its more specify with the name of the tasks that will be better
   * @param description Description of the task
   */
  @Post()
  @UsePipes(ValidationPipe)
  createTask( @Body() createTaskDto: CreateTaskDto) : Tasks{
    return this.taskService.createTasks(createTaskDto);
  }
  /**
   * Update the status of the task
   * The param with the id because is the id task is necessary and came from the path and with the body for the status 
   * because is the thing will change and came from the body params
   * @param id id of the task
   * @param status the new status of the task
   */
  @Patch('/:id/status')
  updateTaskStatus(
      @Param('id') id:string,
      @Body('status', TaskStatusValidation) status: Taskstatus) : Tasks{
          return this.taskService.updateTaskStatus(id, status);
    }
      
    /**
   * Delete a task
   * @param id id of the task to delete
   */
  @Delete('/:id')
  deleteTask( @Param('id') id: string): void {
        this.taskService.deleteTaskById(id); 
   
  }
}
