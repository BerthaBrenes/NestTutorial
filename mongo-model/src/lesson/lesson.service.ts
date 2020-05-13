import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid} from 'uuid';
import { CreateLessonType } from './lesson.input';
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,

    ){}
    
    /**
     * get a lesson by id
     * @param id id of the lesson
     */
    async getLesson(id:string): Promise<Lesson>{
        /**Aquí si coloco solamente id pensara que es el id de mongo 
         * pero si pongo {id} me dará con el id que definimos
         */
        return this.lessonRepository.findOne({id})
    }
    async getAllLesson(): Promise<Lesson[]>{
        return this.lessonRepository.find()
    }
    /**
     * Create a lesson
     * @param createLessonType data of the lesson
     */
    async createLesson(createLessonType: CreateLessonType): Promise<Lesson>{
        const { name, startDate, endDate, students } = createLessonType;
        const lesson = await this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });
        return this.lessonRepository.save(lesson);
    }

    async assingStudentToLesson(lessonId:string,studentsIds:string[]): Promise<Lesson>{
        const lesson = await this.lessonRepository.findOne({ id: lessonId});
        lesson.students = [...lesson.students, ...studentsIds];
        return this.lessonRepository.save(lesson);
    }
}
