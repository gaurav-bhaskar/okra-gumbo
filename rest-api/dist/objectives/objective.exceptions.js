"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadParentObjectiveException = void 0;
const common_1 = require("@nestjs/common");
class BadParentObjectiveException extends common_1.HttpException {
    constructor(objectiveType, expectedObjectiveType, parentObjectiveType) {
        super(`"${objectiveType}" objectives have a parent objective of type "${expectedObjectiveType}", not "${parentObjectiveType}"`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadParentObjectiveException = BadParentObjectiveException;
//# sourceMappingURL=objective.exceptions.js.map