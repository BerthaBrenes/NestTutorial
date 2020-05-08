import { Taskstatus } from "../tasks.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
/**
 * Filters that will pass be watching from the request to the controllers, like a bridge
 */
export class GetTasksFiltersDto{
    /**
     * In here we need to validate the type of the status and also said is an optional params
     */
    @IsOptional()
    @IsIn([Taskstatus.OPEN,Taskstatus.DONE, Taskstatus.IN_PROGRESS])
    status: Taskstatus;

    /**
     * Is an optional params for the request and not empty
     */
    @IsOptional()
    @IsNotEmpty()
    search: string;
}