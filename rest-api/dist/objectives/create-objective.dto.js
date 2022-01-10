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
exports.CreateObjectiveDto = void 0;
const objective_type_1 = require("./objective-type");
const objective_entity_1 = require("./objective.entity");
const class_validator_1 = require("class-validator");
class CreateObjectiveDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateObjectiveDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(objective_type_1.ObjectiveType, { message: `type is a required field that must contain one of the following values: ${Object.values(objective_type_1.ObjectiveType)}` }),
    __metadata("design:type", String)
], CreateObjectiveDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((dto) => dto.type in [objective_type_1.ObjectiveType.PRODUCT_GROUP, objective_type_1.ObjectiveType.PRODUCT]),
    (0, class_validator_1.Matches)(/\/product(?:s|-groups)\/[0-9]+/, { message: 'squad360ApiEndpoint must be a Squad360 product or product group taxonomy item ID endpoint, not including the Squad360 URL (e.g. /products/1)' }),
    __metadata("design:type", String)
], CreateObjectiveDto.prototype, "squad360ApiEndpoint", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateObjectiveDto.prototype, "isDraft", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", objective_entity_1.Objective)
], CreateObjectiveDto.prototype, "parent", void 0);
exports.CreateObjectiveDto = CreateObjectiveDto;
//# sourceMappingURL=create-objective.dto.js.map