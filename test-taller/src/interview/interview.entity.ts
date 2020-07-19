import { BaseEntity, Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Interview extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;
    
    @Column()
    career: string;
}