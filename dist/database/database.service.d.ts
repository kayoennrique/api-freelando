import { User } from '../users/users.service';
interface DB {
    usuarios: User[];
}
export declare class DatabaseService {
    storage: DB;
    constructor();
    sync(): void;
}
export {};
