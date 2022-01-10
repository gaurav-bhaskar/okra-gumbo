import { HttpException } from "@nestjs/common";
import { ObjectiveType } from "./objective-type";
export declare class BadParentObjectiveException extends HttpException {
    constructor(objectiveType: ObjectiveType, expectedObjectiveType: ObjectiveType, parentObjectiveType: ObjectiveType);
}
