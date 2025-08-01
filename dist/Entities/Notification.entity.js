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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
let Notification = class Notification extends typeorm_1.BaseEntity {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", Object)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title,", type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", type: "varchar", length: 255, default: null }),
    __metadata("design:type", Object)
], Notification.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "createdAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Object)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updatedAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Object)
], Notification.prototype, "updatedAt", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)({ name: "Notification" })
], Notification);
