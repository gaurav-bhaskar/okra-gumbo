import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateObjectiveDto } from './data-transfer-objects/create-objective.dto';
import { ObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { UpdateObjectiveDto } from './data-transfer-objects/update-objective.dto';

@Injectable()
export class ObjectivesService {
  constructor(
    @InjectRepository(Objective)
    private readonly repository: Repository<Objective>
  ) {}

  /**
   * Retrieve an arbitrary amount of Objective entries from the database based on the constraints.
   * @param objectiveType         the hierarchial type of objective to query for
   * @param squad360ApiEndpoint   if the hierarchial type is tied to a Squad360 taxonomy item, the endpoint to the specific taxonomy item (e.g. product-groups/1)
   * @returns                     an array of all objectives that satisfy the constraints wrapped in a promise
   */
  findObjectives(objectiveType: ObjectiveType, squad360ApiEndpoint?: string): Promise<Array<Objective>> {
    const searchOptions: {type: ObjectiveType, squad360ApiEndpoint?: string} = {type: objectiveType};
    if(squad360ApiEndpoint) {
      searchOptions.squad360ApiEndpoint = squad360ApiEndpoint;
    }

    return this.repository.find({where: searchOptions});
  }

  /**
   * Create a single new Objective entry in the database given the metadata passed in
   * @param createObjectiveDto The Objective metadata
   * @returns The Objective entry that is stored in the database wrapped in a Promise
   */
  async createObjective(createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    const objective: Objective = await this.repository.create(createObjectiveDto);
    return this.repository.save(objective);
  }

  /**
   * Update the data of a single existing Objective database entry
   * @param id                  The database ID of the already existing Objective entry
   * @param updateObjectiveDto  The data to update the existing Objective entry with
   * @throws NotFoundException  The Objective entry doesn't exist in the database
   * @returns The Objective entry that is stored in the database with the updated information wrapped in a Promise
   */
  async updateObjective(id: number, updateObjectiveDto: UpdateObjectiveDto): Promise<Objective> {
    const objective: Objective = await this.repository.preload(
      {
        id: id,
        ...updateObjectiveDto
      }
    );

    if(!objective) {
      throw new NotFoundException(`Objective ${id} does not exist`);
    }

    return this.repository.save(objective);
  }

  /**
   * Delete an arbitrary number of Objective entries from the database.
   * This method does not check if the Objective entry already exists in the database.
   * @param objectiveIds The database IDs of all Objective entries to delete
   * @returns The result object returned from DeleteQueryBuilder wrapped in a Promise
   */
  deleteObjectives(objectiveIds: Array<number>): Promise<DeleteResult> {
    return this.repository.delete(objectiveIds);
  }
}
