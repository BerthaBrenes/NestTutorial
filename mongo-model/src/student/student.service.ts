import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { v4 as uuid} from 'uuid';
import { CreateStudentType } from './student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ){}
    /**
     * get a student by id
     * @param id id of the student
     */
    async getStudent(id:string): Promise<Student>{
        /**Aquí si coloco solamente id pensara que es el id de mongo 
         * pero si pongo {id} me dará con el id que definimos
         */
        return this.studentRepository.findOne({id})
    }
    /**
     * Get all the student
     */
    async getAllStudents(): Promise<Student[]>{
        return this.studentRepository.find()
    }
    /**
     * Create a student
     * @param createStudentType data of the student
     */
    async createStudent(createStudentType: CreateStudentType): Promise<Student>{
        const { firstName, lastName } = createStudentType;
        const student = await this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });
        return this.studentRepository.save(student);
    }
    async getManyStudent(studentIds: string[]): Promise<Student[]>{
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        });
    }
    
}
