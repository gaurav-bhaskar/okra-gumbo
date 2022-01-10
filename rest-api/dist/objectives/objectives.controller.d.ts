import { CreateObjectiveDto } from './create-objective.dto';
import { ObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { ObjectivesService } from './objectives.service';
export declare class ObjectivesController {
    private readonly service;
    constructor(service: ObjectivesService);
    getObjectives(objectiveType: ObjectiveType, squad360ApiEndpoint?: string): Promise<Array<Objective>>;
    createObjective(createObjectiveDto: CreateObjectiveDto): Promise<Objective>;
}
