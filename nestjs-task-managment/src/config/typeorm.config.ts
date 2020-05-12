import {TypeOrmModuleOptions} from '@nestjs/typeorm';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: "paramsservice_paramsmongodb_1",
    entities: ['dist/**/*.entity.js'],
     synchronize: true
}