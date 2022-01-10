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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectivesController = void 0;
const common_1 = require("@nestjs/common");
const create_objective_dto_1 = require("./create-objective.dto");
const objective_type_1 = require("./objective-type");
const objectives_service_1 = require("./objectives.service");
let ObjectivesController = class ObjectivesController {
    constructor(service) {
        this.service = service;
    }
    getObjectives(objectiveType, squad360ApiEndpoint) {
        return this.service.findObjectives(objectiveType, squad360ApiEndpoint);
    }
    createObjective(createObjectiveDto) {
        var _a;
        const objectiveType = createObjectiveDto.type;
        const expectedParentObjective = (0, objective_type_1.getParentObjectiveType)(objectiveType);
        const actualParentObjective = (_a = createObjectiveDto === null || createObjectiveDto === void 0 ? void 0 : createObjectiveDto.parent) === null || _a === void 0 ? void 0 : _a.type;
        if ((createObjectiveDto.type !== objective_type_1.ObjectiveType.ENTERPRISE) && (expectedParentObjective !== actualParentObjective)) {
            throw new common_1.BadRequestException(`${objectiveType} objectives must be tied to a(n) ${expectedParentObjective} objective`);
        }
        return this.service.createObjective(createObjectiveDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('type', new common_1.ParseEnumPipe(objective_type_1.ObjectiveType, { exceptionFactory: () => new common_1.BadRequestException(`Query parameter "type" is required with one of the following values: ${Object.values(objective_type_1.ObjectiveType)}`) }))),
    __param(1, (0, common_1.Query)('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ObjectivesController.prototype, "getObjectives", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_objective_dto_1.CreateObjectiveDto]),
    __metadata("design:returntype", Promise)
], ObjectivesController.prototype, "createObjective", null);
ObjectivesController = __decorate([
    (0, common_1.Controller)('objectives'),
    __metadata("design:paramtypes", [objectives_service_1.ObjectivesService])
], ObjectivesController);
exports.ObjectivesController = ObjectivesController;
//# sourceMappingURL=objectives.controller.js.map