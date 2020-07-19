import { IsNotEmpty, IsOptional, IsEnum, IsObject, isValidationOptions, IsInstance, ValidateNested, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InterviewDTO{
    @ApiProperty({
        example:'Marvin',
        description: 'Nombre de la entrevista'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example:25,
        description: 'La edad de la entrevista'
    })
    @IsOptional()  
    @IsNumber() 
    age: number;
    
    @ApiProperty({
        example:'Computación',
        description: 'La carrera de la entrevistá'
    })
    @IsString()
    @IsNotEmpty()
    career: string;
}