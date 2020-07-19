import { Controller, Get, Query, Param, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ApiTags, ApiProperty, ApiQuery, ApiParam, ApiResponse, ApiNotFoundResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { query } from 'express';
import { InterviewDTO } from './dto/Interview.dto';

@ApiTags('Interview')
@Controller('interview')
export class InterviewController {
    constructor(private readonly appService: InterviewService) {}
    
    @Get(':id')
    @ApiQuery({ name: 'consulta', type: Object })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: String })
    @ApiNotFoundResponse({status:400, description: 'id not found' })
    getHello(@Query() query: Object, @Param('id')id:string): string {
        return this.appService.getHello(id, query);
    }
    @Post()
    @ApiBody({required: true, type: InterviewDTO})
    @ApiOperation({summary: 'Permite crear una entrevista'})
    @ApiResponse({ status: 201, type: Object })
    @UsePipes(ValidationPipe)
    async createInterview(@Body() data: InterviewDTO){
        return await this.appService.createInterview(data);
    }
    @Get()
    @ApiResponse({ status: 200, type: String })
    @ApiNotFoundResponse({status:400, description: 'id not found' })
    getInterviews() {
        return this.appService.getInterviews();
    }
}
