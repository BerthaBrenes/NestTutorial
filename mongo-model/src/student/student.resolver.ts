import { Resolver,Query, Args, Mutation } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { CreateStudentType } from "./student.input";

@Resolver(of => StudentType)
export class StudentResolver{
    constructor(
        private studentService: StudentService
    ){}
    /**
     * get a student with the id
     * @param id id of the student
     */
    @Query(returns => StudentType)
    student(
        @Args('id') id:string
    ){
     return this.studentService.getStudent(id)   
    }
    /**
     * Create a new student
     * @param createStudentType Information of the student
     */
    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentType') createStudentType: CreateStudentType
    ){
        return this.studentService.createStudent(createStudentType);
    }
    /**
     * Return all the student
     */
    @Query(returns => [StudentType])
    Students(
    ){
     return this.studentService.getAllStudents();
    }
   
}