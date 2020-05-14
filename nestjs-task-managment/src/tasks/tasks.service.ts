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
import { User } from 'src/auth/user.entity';
/**
 * Injectable
 */
@Injectable()
export class TasksService {

    /**
     * Handler the task operation
     * @param taskRepository Repository of the task
     */
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
    /**
     * Get task by id
     * @param id id of the param
     */
    async getTaskById( idTask: string, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne(idTask);
        const ValidUser = await this.taskRepository.findOne({where :{ userId : user.id}});
        if(JSON.stringify(found) != JSON.stringify(ValidUser)){
        throw new NotFoundException(`Not found "${idTask}" in the database`);
        } 
        return found
        
    }
  
    /**
     * Create task
     * @param createTaskDto structure object data
     */
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        
        return this.taskRepository.createTask(createTaskDto, user);
    }
    /**
     * delete task
     * @param id id of the task
     */
    async deleteTask(id: string, user: User): Promise<Task>{
        const task  = await this.getTaskById(id, user);
        await this.taskRepository.delete(id);
        return task
    }
    /**
     * Update task
     */
    async updateTaskStatus(id:string, status:Taskstatus, user:User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
    /**
     * get all the tasks
     */
    async getAllTask(){
        return this.taskRepository.find();
        
    }
    /**
     * 
     * @param filterDto filter param
     */
    getTasksWithFilters(filterDto: GetTasksFiltersDto, user: User): Promise<Task[]>{
        const {status, search} = filterDto;
        if(status){
            return this.taskRepository.find({where: { status: status,userId : user.id } })

        }
        if(search){
            const description = this.taskRepository.find({where:{ description: search, userId: user.id} })
            if(description){
                return description
            }else{
                return this.taskRepository.find({ title: search })
            }
        }
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
