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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let DatabaseService = class DatabaseService {
    constructor() {
        try {
            const rawdata = fs.readFileSync('./storage.json', 'utf-8');
            this.storage = rawdata ? JSON.parse(rawdata) : {};
        }
        catch (error) {
            this.storage = {
                usuarios: [
                    {
                        userId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
                        email: 'john',
                        senha: 'changeme',
                    },
                    {
                        userId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc002',
                        email: 'maria',
                        senha: 'guess',
                    },
                ],
            };
            this.sync();
        }
    }
    sync() {
        const data = JSON.stringify(this.storage);
        fs.writeFileSync('./storage.json', data, { encoding: 'utf8' });
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map