import { DeleteResult, Repository } from 'typeorm';
import { CreateObjectiveDto } from './create-objective.dto';
import { ObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { UpdateObjectiveDto } from './update-objective.dto';
export declare class ObjectivesService {
    private readonly repository;
    constructor(repository: Repository<Objective>);
    findObjectives(objectiveType: ObjectiveType, squad360ApiEndpoint?: string): Promise<Array<Objective>>;
    createObjective(createObjectiveDto: CreateObjectiveDto): Promise<Objective>;
    updateObjective(id: number, updateObjectiveDto: UpdateObjectiveDto): Promise<Objective>;
    deleteObjectives(objectiveIds: Array<number>): Promise<DeleteResult>;
}
