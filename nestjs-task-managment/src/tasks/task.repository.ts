import { Repository, EntityRepository, MongoRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create.task.dto";
import { Taskstatus } from "./tasks.model";
import { GetTasksFiltersDto } from "./dto/get.tasks.filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends MongoRepository<Task>{
   
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = createTaskDto;
        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = Taskstatus.DONE;
        task.user = user;
        task.userId = user.id;
        await task.save();
        return task;
    }
}