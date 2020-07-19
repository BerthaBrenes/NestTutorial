import { MongoRepository, EntityRepository } from "typeorm";
import { Interview } from "./interview.entity";
import { v1 as uuidv1 } from 'uuid';
import { InterviewDTO } from "./dto/Interview.dto";

@EntityRepository(Interview)
export class InterviewRepository extends MongoRepository<Interview>{
    async createInterview(data: InterviewDTO) {
        const { age, name, career } = data;
        const interview = new Interview();
        interview.id = uuidv1();
        interview.age = age;
        interview.career = career;
        interview.name = name;
        await interview.save();
        return interview;
    }
}