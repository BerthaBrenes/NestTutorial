import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn, ManyToOne } from "typeorm";
import { Taskstatus } from "./tasks.model";
import { User } from "src/auth/user.entity";
import { type } from "os";

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

    /**
     * Title of the task
     */
    @Column()
    title: string;

    /**
     * Description of the task
     */
    @Column()
    description:string;

    /**
     * Status of the task
     */
    @Column()
    status: Taskstatus;

    /**
     * User related to this task
     * give several parameter, the first one set the type
     * The second reversal relationship, from user to the tasks
     */
    @ManyToOne(type => User, user => user.tasks, {eager : false})
    user: User;

    @Column()
    userId: number;
}