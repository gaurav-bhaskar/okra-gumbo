import { BadRequestException, Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateObjectiveDto } from './data-transfer-objects/create-objective.dto';
import { UpdateObjectiveDto } from './data-transfer-objects/update-objective.dto';
import { ObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { ObjectivesService } from './objectives.service';

/**
 * Handle all of the HTTP requests and validation regarding Objectives.
 * The actual business logic will be handled in the respective service class
 */
@Controller('objectives')
export class ObjectivesController {

  constructor(
    private readonly service: ObjectivesService
  ) {}

  /**
   * Retrieve a list of objectives from the database.
   * @param objectiveType       the type of objective
   * @param squad360ApiEndpoint if the objective is tied to a specific Squad360 taxonomy item, the endpoint of the specific taxonomy item
   * @returns a list of objectives that match the criteria wrapped in a Promise
   */
  @Get()
  getObjectives(
    @Query('type', new ParseEnumPipe(ObjectiveType, {exceptionFactory: () => new BadRequestException(`Query parameter "type" is required with one of the following values: ${Object.values(ObjectiveType)}`)}))
    objectiveType: ObjectiveType,

    @Query('endpoint')
    squad360ApiEndpoint?: string
  ): Promise<Array<Objective>> {
    return this.service.findObjectives(objectiveType, squad360ApiEndpoint);
  }

  /**
   * Add a new objective to the database. The service will handle parent and Squad360 API endpoint validation.
   * @param createObjectiveDto the request body that contains all of the required fields
   * @returns The Objective that was added to the database wrapped in a Promise
   */
  @Post()
  createObjective(@Body() createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    return this.service.createObjective(createObjectiveDto);
  }

  /**
   * Patch allows users to only send fields that need to be updated in the request body and not all of the required fields.
   * The service will handle parent and Squad360 API endpoint validation.
   * @param id                  the unique database ID of the objective to update
   * @param updateObjectiveDto  the request body that contains all of the Objective's fields to update
   * @returns the Objective with its updated values wrapped in a Promise
   */
  @Patch(':id')
  updateObjective(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateObjectiveDto: UpdateObjectiveDto
  ): Promise<Objective> {
    return this.service.updateObjective(id, updateObjectiveDto);
  }

  /**
   * Remove a single Objective entity from the database.
   * This does not check if the entry exists in the database.
   * @param id the database ID of the Objective entry to delete
   * @returns The result from the DeleteQueryBuilder wrapped in a Promise
   */
  @Delete(':id')
  deleteObjective(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.deleteObjective(id);
  }
}
