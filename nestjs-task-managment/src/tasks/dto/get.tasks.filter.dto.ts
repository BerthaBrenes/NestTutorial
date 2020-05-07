import { Taskstatus } from "../tasks.model";

export class GetTasksFiltersDto{
    status: Taskstatus;
    search: string;
}