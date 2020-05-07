import { Injectable } from '@nestjs/common';
import { Tasks, Taskstatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create.task.dto';
import { GetTasksFiltersDto } from './dto/get.tasks.filter.dto';
import { stat } from 'fs';
import { isRegExp } from 'util';

@Injectable()
export class TasksService {
    /**
     * list of data for provide
     * Private means anyone can change it
     */
    private tasks:Tasks[] = [];
    /**
     * Function to get the lists
     */
    getAllTasks(): Tasks[]{
        return this.tasks;
    }
    /**
     * Method that get the tasks with the same id
     * @param id id of the tasks
     */
    getTaskById( id: string){
        return this.tasks.find(task => task.id === id)
    }
    /**
     * Delete the task by the id
     * ERROR RangeError: Maximum call stack size exceeded
     * @param id id of the task
     */
    deleteTaskById(id:string):void{
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
    /**
     * function that create a task
     * Good practice to return the data you made
     */
    createTasks(createTaskDto: CreateTaskDto): Tasks{
        const {title, description} = createTaskDto;
        const tasks: Tasks = {
            id: uuidv1(),
            title,
            description,
            status: Taskstatus.OPEN,
        };
        this.tasks.push(tasks);
        return tasks;
    }
    /**
     * Update the status of a single task
     * @param id of the task
     * @param status of the task
     */
    updateTaskStatus(id:string, status: Taskstatus){
        const task = this.getTaskById(id);
        task.status = status
        return task;
    }
    /**
     * Method that
     * @param filterDto query of the handler
     */
    getTasksWithFilters(filterDto: GetTasksFiltersDto): Tasks[]{
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);

        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search),
                )
        }
        return tasks;
    }

}
