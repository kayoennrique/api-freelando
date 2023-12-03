import { DatabaseService } from 'src/database/database.service';
export declare class User {
    userId: string;
    perfil?: 'cliente' | 'freelancer';
    interesse?: string;
    nome?: string;
    uf?: string;
    cidade?: string;
    email: string;
    senha: string;
    refresh_token?: string;
}
export declare class UsersService {
    private db;
    constructor(db: DatabaseService);
    save(usuario: User): User;
    findById(id: string): User | undefined;
    findOne(email: string): User | undefined;
    update(data: User): User;
    updateRefreshToken(userId: string, refresh_token: string): void;
}
