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
exports.Test = void 0;
const typeorm_1 = require("typeorm");
const Question_entity_1 = require("./Question.entity");
let Test = class Test extends typeorm_1.BaseEntity {
};
exports.Test = Test;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], Test.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Test.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Question_entity_1.Question, (question) => question.test, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], Test.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'question', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Test.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marks', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Test.prototype, "marks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Test.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Test.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Test.prototype, "updatedAt", void 0);
exports.Test = Test = __decorate([
    (0, typeorm_1.Entity)('Testbl')
], Test);
