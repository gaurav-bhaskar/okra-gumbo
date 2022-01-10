import { ObjectiveType } from "./objective-type";
import { Objective } from "./objective.entity";
export declare class CreateObjectiveDto {
    name: string;
    type: ObjectiveType;
    squad360ApiEndpoint?: string;
    isDraft: boolean;
    parent?: Objective;
}
