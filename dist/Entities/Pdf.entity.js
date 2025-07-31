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
exports.Pdftbl = void 0;
const typeorm_1 = require("typeorm");
let Pdftbl = class Pdftbl extends typeorm_1.BaseEntity {
};
exports.Pdftbl = Pdftbl;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Pdftbl.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Pdftbl.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "size", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Pdftbl.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "url", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Pdftbl.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "thumbnail", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Pdftbl.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Pdftbl.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Pdftbl.prototype, "updatedAt", void 0);
exports.Pdftbl = Pdftbl = __decorate([
    (0, typeorm_1.Entity)({ name: "PDF" })
], Pdftbl);
