import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Student } from 'src/student/student.entity';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: "paramsservice_paramsmongodb_1",
    entities: [
        Lesson,
        Student
    ],
    synchronize: true,
    useUnifiedTopology: true
}