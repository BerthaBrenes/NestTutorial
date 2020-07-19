import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { Interview } from 'src/interview/interview.entity';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mongodb',
    host: (process.env.MONGODB_HOST ? process.env.MONGODB_HOST : 'localhost'),
    port: 27017,
    database: "interviewDB",
    synchronize: true,
    useUnifiedTopology: true,
    entities: [
        Interview
    ]
     
}