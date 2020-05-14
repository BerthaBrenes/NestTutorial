import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('authentication')
export class AuthController {
    /**
     * create a logger in this page
     */
    private logger = new Logger('AuthController');

    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<void>{
        this.logger.verbose(`SigUp with the ${JSON.stringify(authCredentialsDto)}`);
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/SignIn')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<{accessToken: string}>{
        this.logger.verbose(`SigIn with the ${JSON.stringify(authCredentialsDto)}`);
        return this.authService.signIn(authCredentialsDto);
    }
    @Get('/register')
    getAllUsers(): Promise<User[]>{
        return this.authService.getAllTasks();
    }

    /**
     * Valida la autenticacion con un access token, utiliza el custom decorator GetUser y extrae solamente el usuario asociado a ese token
     * En el header debe poner Authorization de nombre y en el value Bearer <<AccessToken>>
     * @param user 
     */
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        this.logger.verbose(`SigUp with the ${JSON.stringify(user)}`);
    }
}
