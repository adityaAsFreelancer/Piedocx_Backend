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
exports.CertificateTbl = void 0;
const typeorm_1 = require("typeorm");
let CertificateTbl = class CertificateTbl extends typeorm_1.BaseEntity {
};
exports.CertificateTbl = CertificateTbl;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], CertificateTbl.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tokenid", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "tokenid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "studentname", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "studentname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "college", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "college", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "whatsappNumber", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "whatsappNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "feedback", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Course", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], CertificateTbl.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], CertificateTbl.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], CertificateTbl.prototype, "updatedAt", void 0);
exports.CertificateTbl = CertificateTbl = __decorate([
    (0, typeorm_1.Entity)({ name: "Certificate" })
], CertificateTbl);
