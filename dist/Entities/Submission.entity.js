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
exports.Submission = void 0;
const typeorm_1 = require("typeorm");
const Test_entity_1 = require("./Test.entity");
let Submission = class Submission extends typeorm_1.BaseEntity {
};
exports.Submission = Submission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Submission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'useremail', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "mobile", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'testId', type: 'uuid' }),
    __metadata("design:type", String)
], Submission.prototype, "testId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Test_entity_1.Test, (test) => test.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'testId' }),
    __metadata("design:type", Test_entity_1.Test)
], Submission.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Submission.prototype, "submitted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Submission.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "correct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "incorrect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "unanswered", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "totalQuestions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Submission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Submission.prototype, "updatedAt", void 0);
exports.Submission = Submission = __decorate([
    (0, typeorm_1.Entity)('Submissions')
], Submission);
