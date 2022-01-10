import { PartialType } from '@nestjs/mapped-types';
import { CreateObjectiveDto } from './create-objective.dto';

/**
 * Every field in CreateObjectiveDto is valid in this class, but every field is optional
 * since the entry already exists in the database.
 * PartialType handles making every field optional for us.
 */
export class UpdateObjectiveDto extends PartialType(CreateObjectiveDto) {}
