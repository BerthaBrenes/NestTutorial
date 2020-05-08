import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { Taskstatus } from "../tasks.model";
/**
 * Implements a custom pipe validation in this case for the status of the task
 * that means the status giving is part of the Tasks status and will not receive any other
 */
export class TaskStatusValidation implements PipeTransform{
   /**
    * A simple read only list with the valid status of the Tasks
    */
   readonly allowedStatues = [
      Taskstatus.DONE,
      Taskstatus.OPEN,
      Taskstatus.IN_PROGRESS
   ];
   /**
    * Is mandatory the transform method, because is the method to handlers the pipe
    * @param value Value of the param, in this case the status
    * @param metadata Metadata will give you the type and value of your value
    */
 transform(value:any, metadata:ArgumentMetadata){
    console.log('custom pip,',value);
    console.log('metadata',metadata);
    value = value.toUpperCase();
    if(!this.isStatudValid(value)){
       throw new BadRequestException(`The "${{value}}" is not a valid status`)
    }
    return value;
 }
 /**
  * Validate the status
  * @param status Status receive in the request
  */
 private isStatudValid(status: any): boolean{
   const sdk = this.allowedStatues.indexOf(status);
   return sdk !== -1;
 }
}