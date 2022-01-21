import { NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateObjectiveDto } from "../data-transfer-objects/create-objective.dto";
import { UpdateObjectiveDto } from "../data-transfer-objects/update-objective.dto";
import { ObjectiveType, validateParentObjectiveType, validateSquad360ApiEndpoint } from "../objective-type";
import { Objective } from "../objective.entity";

/**
 * A mock class for the ObjectivesService class.
 * This will handle all of the business logic required out of the class
 * without interacting with an actual database.
 */
export const ObjectivesServiceStub = {
  findObjectives: (objectiveType: ObjectiveType, squad360ApiEndpoint?: string): Array<Objective> => {
    return [];
  },

  createObjective: (createObjectiveDto: CreateObjectiveDto): Objective => {
    const objective: Objective = {
      id: 0,
      dateCreated: undefined,
      dateLastUpdated: undefined,
      dateDeleted: undefined,
      name: '',
      isDraft: false,
      type: createObjectiveDto.type,
      squad360ApiEndpoint: '',
      parent: createObjectiveDto?.parent,
      children: []
    };

    validateParentObjectiveType(objective.type, objective.parent?.type);
    validateSquad360ApiEndpoint(objective.type, objective.squad360ApiEndpoint);

    return objective;
  },

  updateObjective: (id: number, updateObjectiveDto: UpdateObjectiveDto): Objective => {
    let objective: Objective;
    const parentObjective: Objective = {
      id: 2,
      dateCreated: undefined,
      dateLastUpdated: undefined,
      dateDeleted: undefined,
      name: '',
      isDraft: false,
      type: ObjectiveType.PORTFOLIO,
      squad360ApiEndpoint: '',
      parent: new Objective(),
      children: []
    }

    if(id === 0) {
      objective = {
        id: id,
        dateCreated: undefined,
        dateLastUpdated: undefined,
        dateDeleted: undefined,
        name: '',
        isDraft: false,
        type: updateObjectiveDto.type ? updateObjectiveDto.type : ObjectiveType.PRODUCT,
        squad360ApiEndpoint: updateObjectiveDto.squad360ApiEndpoint ? updateObjectiveDto.squad360ApiEndpoint : '/products/123',
        parent: updateObjectiveDto.parent ? updateObjectiveDto.parent : parentObjective,
        children: []
      };
    } else {
      objective = undefined;
    }

    if(!objective) {
      throw new NotFoundException(`Objective ${id} does not exist`);
    }

    validateParentObjectiveType(objective.type, objective.parent?.type);
    validateSquad360ApiEndpoint(objective.type, objective.squad360ApiEndpoint);

    return objective;
  },

  deleteObjective: (id: number): DeleteResult => {
    return { raw: undefined };
  }
}