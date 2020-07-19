import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewRepository } from './interview.repository';
import { InterviewDTO } from './dto/Interview.dto';

@Injectable()
export class InterviewService {
    constructor(
        @InjectRepository(InterviewRepository)
        private interviewRepository: InterviewRepository){}
    getHello(id: string, data:Object): string {
        const response = `Hello World ${id} con la data ${data['edad']} ${data['carrera']}`;
        return response;
    }
    async createInterview(dataInterview: InterviewDTO){
        const {name} = dataInterview;
        const found = await this.interviewRepository.findOne({where: {'name':name}})
        console.log('found Interview', found);
        if(found){
            throw new ConflictException(`El nombre de la entrevista ${name} ya existe`);
        }
        return await this.interviewRepository.createInterview(dataInterview);
    }
    async getInterviews(){
        return await this.interviewRepository.find();
    }
}
