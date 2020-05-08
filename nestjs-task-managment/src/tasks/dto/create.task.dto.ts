import {IsNotEmpty} from 'class-validator';

/**
 * Aca se están usando pipe para validar que los datos no sean nulos
 */
export class CreateTaskDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string
}