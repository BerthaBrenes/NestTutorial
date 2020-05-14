import { BaseEntity, Entity, Column, ObjectIdColumn, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    /**
     * Primary Column with the id of the database
     */
    @ObjectIdColumn()
    id: number;

    /**
     * Salt for the validation process, this is auto and generate each time an user is created
     */
    @Column()
    salt:string

    /**
     * The username 
     */
    @Column()
    username: string;

    /**
     * The password the user enter. but the database never store the exactly password
     */
    @Column()
    password: string;
    
    /**
     * A relationship between task and user. 
     * give several parameter, the first one set the type
     * The second reversal relationship, from task to user
     * third let the user access to the tasks as an object
     */
    @OneToMany(type => Task, task => task.user, { eager: true } )
    tasks: []

    /**
     * validate that the password pass over the login, is the same in the database( encrypted)
     * @param password password the user insert in the login
     */
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password,this.salt);
        const answer = hash === this.password
        return answer;
    }
}