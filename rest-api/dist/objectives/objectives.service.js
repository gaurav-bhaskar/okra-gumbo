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
exports.ObjectivesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const objective_entity_1 = require("./objective.entity");
let ObjectivesService = class ObjectivesService {
    constructor(repository) {
        this.repository = repository;
    }
    findObjectives(objectiveType, squad360ApiEndpoint) {
        const searchOptions = { type: objectiveType };
        if (squad360ApiEndpoint) {
            searchOptions.squad360ApiEndpoint = squad360ApiEndpoint;
        }
        return this.repository.find({ where: searchOptions });
    }
    async createObjective(createObjectiveDto) {
        const objective = await this.repository.create(createObjectiveDto);
        return this.repository.save(objective);
    }
    async updateObjective(id, updateObjectiveDto) {
        const objective = await this.repository.preload(Object.assign({ id: id }, updateObjectiveDto));
        if (!objective) {
            throw new common_1.NotFoundException(`Objective ${id} does not exist`);
        }
        return this.repository.save(objective);
    }
    deleteObjectives(objectiveIds) {
        return this.repository.delete(objectiveIds);
    }
};
ObjectivesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(objective_entity_1.Objective)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ObjectivesService);
exports.ObjectivesService = ObjectivesService;
//# sourceMappingURL=objectives.service.js.map