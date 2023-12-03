"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.User = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const uuidv4_1 = require("uuidv4");
const swagger_1 = require("@nestjs/swagger");
class User {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "perfil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "interesse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
exports.User = User;
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    save(usuario) {
        const usuarioComMesmoEmail = this.findOne(usuario.email);
        if (usuarioComMesmoEmail) {
            throw new common_1.BadRequestException('Já existe um usuário cadastrado com esse e-mail.');
        }
        usuario.userId = (0, uuidv4_1.uuid)();
        this.db.storage.usuarios.push(usuario);
        this.db.sync();
        return usuario;
    }
    findById(id) {
        return this.db.storage.usuarios.find((user) => user.userId === id);
    }
    findOne(email) {
        return this.db.storage.usuarios.find((user) => user.email === email);
    }
    update(data) {
        let user = this.findOne(data.email);
        user = Object.assign({}, data);
        this.db.sync();
        return user;
    }
    updateRefreshToken(userId, refresh_token) {
        const user = this.findById(userId);
        user.refresh_token = refresh_token;
        this.update(Object.assign({}, user));
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map