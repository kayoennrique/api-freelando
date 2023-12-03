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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, senha) {
        const user = await this.usersService.findOne(email);
        if (user && user.senha === senha) {
            const { senha } = user, result = __rest(user, ["senha"]);
            return result;
        }
        return null;
    }
    login(user) {
        const payload = { email: user.nome, userId: user.userId };
        const tokens = this.getTokens(payload);
        this.updateRefreshToken(user.userId, tokens.refresh_token);
        return tokens;
    }
    register(usuario) {
        const { userId } = this.usersService.save(usuario);
        const tokens = this.getTokens({ userId, email: usuario.email });
        this.updateRefreshToken(userId, tokens.refresh_token);
    }
    getTokens(payload) {
        const access_token = this.jwtService.sign(Object.assign(Object.assign({}, payload), { sub: payload.userId }), { expiresIn: '15s' });
        const refresh_token = this.jwtService.sign(Object.assign(Object.assign({}, payload), { sub: payload.userId }), { expiresIn: '7d' });
        return {
            access_token,
            refresh_token,
        };
    }
    refreshTokens(userId, refreshToken) {
        const user = this.usersService.findById(userId);
        debugger;
        if (!user || !user.refresh_token) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = user.refresh_token === refreshToken;
        if (!refreshTokenMatches) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = this.getTokens({
            email: user.email,
            userId: user.userId,
        });
        this.updateRefreshToken(user.userId, tokens.refresh_token);
        return tokens;
    }
    updateRefreshToken(userId, refresh_token) {
        this.usersService.updateRefreshToken(userId, refresh_token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map