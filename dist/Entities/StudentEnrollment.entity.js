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
exports.EnrollMent = void 0;
const typeorm_1 = require("typeorm");
let EnrollMent = class EnrollMent extends typeorm_1.BaseEntity {
};
exports.EnrollMent = EnrollMent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", Object)
], EnrollMent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "college", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "applyFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "2025", nullable: true }),
    __metadata("design:type", String)
], EnrollMent.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: null }),
    __metadata("design:type", String)
], EnrollMent.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], EnrollMent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], EnrollMent.prototype, "updatedAt", void 0);
exports.EnrollMent = EnrollMent = __decorate([
    (0, typeorm_1.Entity)({ name: "StudentEnrollMent" })
], EnrollMent);
