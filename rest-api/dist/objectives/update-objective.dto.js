"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateObjectiveDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_objective_dto_1 = require("./create-objective.dto");
class UpdateObjectiveDto extends (0, mapped_types_1.PartialType)(create_objective_dto_1.CreateObjectiveDto) {
}
exports.UpdateObjectiveDto = UpdateObjectiveDto;
//# sourceMappingURL=update-objective.dto.js.map