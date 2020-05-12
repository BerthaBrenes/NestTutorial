import { Repository, EntityRepository, MongoRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create.task.dto";
import { Taskstatus } from "./tasks.model";

@EntityRepository(Task)
export class TaskRepository extends MongoRepository<Task>{
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const {title, description} = createTaskDto;
        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = Taskstatus.DONE;
        await task.save();
        
        return task;
    }
}