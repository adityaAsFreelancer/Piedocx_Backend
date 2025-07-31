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
exports.Lecture = void 0;
const typeorm_1 = require("typeorm");
let Lecture = class Lecture extends typeorm_1.BaseEntity {
};
exports.Lecture = Lecture;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], Lecture.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", nullable: true }),
    __metadata("design:type", String)
], Lecture.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lecture.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image", nullable: true }),
    __metadata("design:type", String)
], Lecture.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PlayListId", nullable: true }),
    __metadata("design:type", String)
], Lecture.prototype, "PlaylistId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "createdAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Lecture.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updatedAt",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Lecture.prototype, "updatedAt", void 0);
exports.Lecture = Lecture = __decorate([
    (0, typeorm_1.Entity)({ name: "Lecture" })
], Lecture);
