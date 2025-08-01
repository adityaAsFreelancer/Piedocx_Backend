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
exports.Clienttbl = void 0;
const typeorm_1 = require("typeorm");
let Clienttbl = class Clienttbl extends typeorm_1.BaseEntity {
};
exports.Clienttbl = Clienttbl;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Clienttbl.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Clienttbl.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Clienttbl.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Clienttbl.prototype, "updatedAt", void 0);
exports.Clienttbl = Clienttbl = __decorate([
    (0, typeorm_1.Entity)({ name: "Client" })
], Clienttbl);
