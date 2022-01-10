"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentObjectiveType = exports.ObjectiveType = void 0;
var ObjectiveType;
(function (ObjectiveType) {
    ObjectiveType["ENTERPRISE"] = "Enterprise";
    ObjectiveType["PORTFOLIO"] = "Portfolio";
    ObjectiveType["PRODUCT_GROUP"] = "Product Group";
    ObjectiveType["PRODUCT"] = "Product";
})(ObjectiveType = exports.ObjectiveType || (exports.ObjectiveType = {}));
function getParentObjectiveType(objectiveType) {
    let type;
    switch (objectiveType) {
        case ObjectiveType.PORTFOLIO:
            type = ObjectiveType.ENTERPRISE;
            break;
        case ObjectiveType.PRODUCT_GROUP:
        case ObjectiveType.PRODUCT:
            type = ObjectiveType.PORTFOLIO;
            break;
        default:
            type = undefined;
            break;
    }
    return type;
}
exports.getParentObjectiveType = getParentObjectiveType;
//# sourceMappingURL=objective-type.js.map