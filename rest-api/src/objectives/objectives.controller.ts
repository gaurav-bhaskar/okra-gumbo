import { BadRequestException, Body, Controller, Get, ParseEnumPipe, Post, Query } from '@nestjs/common';
import { CreateObjectiveDto } from './data-transfer-objects/create-objective.dto';
import { ObjectiveType, validateParentObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { ObjectivesService } from './objectives.service';

@Controller('objectives')
export class ObjectivesController {

  constructor(
    private readonly service: ObjectivesService
  ) {}

  @Get()
  getObjectives(
    @Query('type', new ParseEnumPipe(ObjectiveType, {exceptionFactory: () => new BadRequestException(`Query parameter "type" is required with one of the following values: ${Object.values(ObjectiveType)}`)}))
    objectiveType: ObjectiveType,

    @Query('endpoint')
    squad360ApiEndpoint?: string): Promise<Array<Objective>> 
  {
    return this.service.findObjectives(objectiveType, squad360ApiEndpoint);
  }

  @Post()
  createObjective(@Body() createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    validateParentObjectiveType(createObjectiveDto.type, createObjectiveDto?.parent?.type);

    return this.service.createObjective(createObjectiveDto);
  }
}
