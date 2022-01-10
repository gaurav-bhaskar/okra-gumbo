import { ObjectiveType } from "../objective-type";
import { Objective } from "../objective.entity";
import { IsBoolean, IsEnum, IsInstance, IsNotEmpty, IsOptional, IsString, Matches, Validate, ValidateBy, ValidateIf } from 'class-validator';

/**
 * All of the fields that can be passed in the request body for creating a new Objective
 */
export class CreateObjectiveDto {
  /**
   * Required. The name of the objective
   */
  @IsString()
  name: string;

  /**
   * Required. The objective hierarchy classification.
   */
  @IsEnum(ObjectiveType, { message: `type is a required field that must contain one of the following values: ${Object.values(ObjectiveType)}` })
  type: ObjectiveType;

  /**
   * Optional. If the Objective is tied to a hierarchy classification that is related to a Squad360 taxonomy item,
   * this is the endpoint to the id of the taxonomy item
   */
  @IsOptional()
  @Matches(/\/product(?:s|-groups)\/[0-9]+/, {message: 'squad360ApiEndpoint must be a Squad360 product or product group taxonomy item ID endpoint, not including the Squad360 URL (e.g. /products/1)'})
  squad360ApiEndpoint?: string;

  /**
   * Required. Is this Objective going to be actively measured.
   */
  @IsBoolean()
  isDraft: boolean;

  /**
   * Optional-ish.
   * Objectives can be aligned to a higher level Objective.
   * If the Objective is not the highest level type, it must be tied to a parent Objective.
   */
  @IsOptional()
  parent?: Objective;
}
