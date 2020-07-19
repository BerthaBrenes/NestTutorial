import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Controller')
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary:"Permite recibir un hello world"})
  getHello(): string {
    return this.appService.getHello();
  }
}
