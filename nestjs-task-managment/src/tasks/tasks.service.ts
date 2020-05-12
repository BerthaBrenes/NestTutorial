import { Injectable, NotFoundException } from '@nestjs/common';
import { Taskstatus } from './tasks.model';
import { CreateTaskDto } from './dto/create.task.dto';
import { GetTasksFiltersDto } from './dto/get.tasks.filter.dto';
import { stat } from 'fs';
import { isRegExp } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
    async getTaskById( id: string): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
        throw new NotFoundException(`Not found "${id}" in the database`);
        } 
        return found
        
    }
  
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        
        return this.taskRepository.createTask(createTaskDto);
    }
    async deleteTask(id: string): Promise<Task>{
        const task  = await this.getTaskById(id);
        await this.taskRepository.delete(id);
        return task
    }
    /**
     * Update task
     */
    async updateTaskStatus(id:string, status:Taskstatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }


    /*************A partir de aquí son las cosas sin mongo******************* */
    /**
     * list of data for provide
     * Private means anyone can change it
     */
    // private tasks:Tasks[] = [];
    // /**
    //  * Function to get the lists
    //  */
    // getAllTasks(): Tasks[]{
    //     return this.tasks;
    // }
    // /**
    //  * Method that get the tasks with the same id
    //  * @param id id of the tasks
    //  */
    // getTaskById( id: string){
    //     const found =  this.tasks.find(task => task.id === id);
    //     if(!found){
    //     throw new NotFoundException(`Not found "${id}" in the database`);
    //     } 
    //     return found
        
    // }
    // /**
    //  * Delete the task by the id
    //  * ERROR RangeError: Maximum call stack size exceeded
    //  * @param id id of the task
    //  */
    // deleteTaskById(id:string):void{
    //    const found =  this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }
    // /**
    //  * function that create a task
    //  * Good practice to return the data you made
    //  */
    // createTasks(createTaskDto: CreateTaskDto): Tasks{
    //     const {title, description} = createTaskDto;
    //     const tasks: Tasks = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: Taskstatus.OPEN,
    //     };
    //     this.tasks.push(tasks);
    //     return tasks;
    // }
    // /**
    //  * Update the status of a single task
    //  * @param id of the task
    //  * @param status of the task
    //  */
    // updateTaskStatus(id:string, status: Taskstatus){
    //     const task = this.getTaskById(id);
    //     task.status = status
    //     return task;
    // }
    // /**
    //  * Method that
    //  * @param filterDto query of the handler
    //  */
    // getTasksWithFilters(filterDto: GetTasksFiltersDto): Tasks[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);

    //     }
    //     if(search){
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) || 
    //             task.description.includes(search),
    //             )
    //     }
    //     return tasks;
    // }

}
