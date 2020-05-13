import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonType } from "./lesson.input";
import { AssignStudentToLessonInput } from "./students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { StudentService } from "src/student/student.service";

@Resolver(of => LessonType)
export class LessonResolver{
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ){}
    /**
     * get a lesson with the id
     * @param id id of the Lesson
     */
    @Query(returns => LessonType)
    lesson(
        @Args('id') id:string
    ){
     return this.lessonService.getLesson(id)   
    }
    /**
     * Create a new lesson
     * @param createLessonType Information of the lesson
     */
    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonType: CreateLessonType
    ){
        return this.lessonService.createLesson(createLessonType);
    }
    @Query(returns => [LessonType])
    Lessons(
    ){
     return this.lessonService.getAllLesson()   
    } 

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentToLessonInput') assignStudentToLessonInput: AssignStudentToLessonInput
    ){
        const {lessonId, studentsIds} = assignStudentToLessonInput;
        return this.lessonService.assingStudentToLesson(lessonId, studentsIds);
    }
     /**
     * Return the student in the graph playground
     */
    @ResolveField()
    async students(@Parent() lesson: Lesson){
        return this.studentService.getManyStudent(lesson.students)

    }
}