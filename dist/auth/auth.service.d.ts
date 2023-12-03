import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, senha: string): Promise<any>;
    login(user: User): {
        access_token: string;
        refresh_token: string;
    };
    register(usuario: User): void;
    getTokens(payload: {
        userId: string;
        email: string;
    }): {
        access_token: string;
        refresh_token: string;
    };
    refreshTokens(userId: string, refreshToken: string): {
        access_token: string;
        refresh_token: string;
    };
    updateRefreshToken(userId: string, refresh_token: string): void;
}
