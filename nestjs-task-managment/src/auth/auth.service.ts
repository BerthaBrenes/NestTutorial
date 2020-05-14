import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
/**
 * Injectable class
 */
@Injectable()
export class AuthService {
    /**
     * 
     * @param userRepository Repositorio de usuario
     * @param jwtService Servicio de Jwt
     */
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    /**
     * Registrarse en la aplicación
     * @param authCredentialsDto Dto con las credenciales dadas body del request
     */
    signUp(authCredentialsDto: AuthCredentialDto){
        return this.userRepository.signUp(authCredentialsDto);
    }

    /**
     * Ingresar a la aplicación, validación de la contraseña
     * @param authCredentialsDto Dto con las credenciales dadas body del request
     */
    async signIn(authCredentialsDto: AuthCredentialDto): Promise<{accessToken: string}>{
        const username =  await this.userRepository.ValidateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credential');
        }

        const payload: JwtPayload = { username};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken}
    }

    /**
     * Obtener las tareas existentes
     */
    getAllTasks():Promise<User[]>{
        return this.userRepository.find();
    }
}
