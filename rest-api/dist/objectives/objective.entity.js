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
var Objective_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objective = void 0;
const typeorm_1 = require("typeorm");
const objective_type_1 = require("./objective-type");
let Objective = Objective_1 = class Objective {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Objective.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Objective.prototype, "dateCreated", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Objective.prototype, "dateLastUpdated", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Objective.prototype, "dateDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Objective.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Objective.prototype, "isDraft", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: objective_type_1.ObjectiveType
    }),
    __metadata("design:type", String)
], Objective.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Objective.prototype, "squad360ApiEndpoint", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Objective_1, (obj) => obj.children),
    __metadata("design:type", Objective)
], Objective.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Objective_1, (obj) => obj.parent),
    __metadata("design:type", Array)
], Objective.prototype, "children", void 0);
Objective = Objective_1 = __decorate([
    (0, typeorm_1.Entity)()
], Objective);
exports.Objective = Objective;
//# sourceMappingURL=objective.entity.js.map