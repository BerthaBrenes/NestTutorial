import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Lesson } from "src/lesson/lesson.entity";

@ObjectType('Student')
export class StudentType{
    @Field(
        type => ID
    )
    id:string;

    @Field()
    firstName:string;
    
    //curses: Lesson[];
    @Field()
    lastName: string;
}