import { ObjectiveType } from "./objective-type";
export declare class Objective {
    id: number;
    dateCreated: Date;
    dateLastUpdated: Date;
    dateDeleted: Date;
    name: string;
    isDraft: boolean;
    type: ObjectiveType;
    squad360ApiEndpoint: string;
    parent: Objective;
    children: Array<Objective>;
}
