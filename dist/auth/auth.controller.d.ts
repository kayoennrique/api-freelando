import { User, UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
declare class LoginDTO {
    email?: string;
    senha?: string;
}
declare class ProfileDTO {
    userId: string;
    perfil?: 'cliente' | 'freelancer';
    interesse?: string;
    nome?: string;
    uf?: string;
    cidade?: string;
    email: string;
}
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any, credenciais: LoginDTO): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(usuario: User): Promise<void>;
    refresh(req: any): {
        access_token: string;
        refresh_token: string;
    };
    getProfile(req: any): ProfileDTO;
}
export {};
