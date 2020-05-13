import { InputType, Field } from "@nestjs/graphql";
import { MinLength, IsString } from "class-validator";

@InputType()
export class CreateStudentType{
    
    @MinLength(1)
    @Field()
    firstName: string;

    @IsString()
    @Field()
    lastName: string;

}