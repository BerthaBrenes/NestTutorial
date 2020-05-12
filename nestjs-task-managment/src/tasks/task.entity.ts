import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from "typeorm";
import { Taskstatus } from "./tasks.model";

/**
 * Class for the entity of our data base
 */
@Entity()
export class Task extends BaseEntity{
    /**
     * Esto genera una llave automática y única porque funciona como
     * un superKey por lo que se debería desinstalar uuid
     * npm uninstall uuid
     */
    @ObjectIdColumn()
    id:string;

    @Column()
    title: string;

    @Column()
    description:string;

    @Column()
    status: Taskstatus
}