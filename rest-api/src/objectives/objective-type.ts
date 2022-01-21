import { BadRequestException } from "@nestjs/common";

/**
 * Objectives have a classification tied to them
 * These are all the available classifications
 */
export enum ObjectiveType {
  ENTERPRISE = 'Enterprise',
  PORTFOLIO = 'Portfolio',
  PRODUCT_GROUP = 'Product Group',
  PRODUCT = 'Product'
}

/**
 * Objectives are supposed to be aligned with a higher classification objective
 * unless they are objectives at the highest level
 * @param objectiveType the type of Objective to find the parent for
 * @returns the parent Objective type, or undefined the type does not have a parent
 */
function getParentObjectiveType(objectiveType: ObjectiveType): ObjectiveType {
  let type: ObjectiveType;
  switch(objectiveType) {
    case ObjectiveType.PORTFOLIO:
      type = ObjectiveType.ENTERPRISE;
      break;
    case ObjectiveType.PRODUCT_GROUP:
    case ObjectiveType.PRODUCT:
      type = ObjectiveType.PORTFOLIO;
      break;
    default:
      type = undefined;
      break;
  }

  return type;
}

/**
 * Whenever a user attempts to create or update an objective, the objective needs be tied to a parent objective.
 * However, the parent objective must be of a specific type.
 * @param objectiveType        the classification of the objective to create/update
 * @param parentObjectiveType  parent objective classification to validate
 * @throws BadRequestException Objective has no parent objective and one has been provided, or the incorrect parent Objective classification has been used.
 */
export function validateParentObjectiveType(objectiveType: ObjectiveType, parentObjectiveType: ObjectiveType): boolean {
  const expectedParentObjectiveType: ObjectiveType = getParentObjectiveType(objectiveType);

  if((!expectedParentObjectiveType) && parentObjectiveType)
    throw new BadRequestException(`${objectiveType} objectives cannot be tied to a higher level objective`);

  if(expectedParentObjectiveType && (expectedParentObjectiveType !== parentObjectiveType))
    throw new BadRequestException(`${objectiveType} objectives must be tied to a(n) ${expectedParentObjectiveType} objective`);

  return true;
}

/**
 * Some objectives can be tied to a Squad360 taxonomy item depending on its classification.
 * If objective can be tied to a Squad360 taxonomy item, ensure that it's the right taxonomy item.
 * @param objectiveType the classification of the objective to create/update
 * @param endpoint      the endpoint to the Squad360 taxonomy item
 * @throws BadRequestException the Objective is not supposed to be tied to a Squad360 taxonomy item and an endpoint has been provided, or the incorrect endpoint has been provided
 */
export function validateSquad360ApiEndpoint(objectiveType: ObjectiveType, endpoint: string): boolean {
  let regex: RegExp;
  switch(objectiveType) {
    case ObjectiveType.PRODUCT:
      // example: /products/123
      regex = /\/products\/[0-9]+/;
      break;
    case ObjectiveType.PRODUCT_GROUP:
      // example: /product-groups/123
      regex = /\/product-groups\/[0-9]+/;
      break;
    default:
      regex = undefined;
      break;
  }

  if((!regex) && endpoint)
    throw new BadRequestException(`${objectiveType} objectives are not tied to Squad360 taxonomy items`);

  if(regex && (!regex.test(endpoint)))
    throw new BadRequestException(`${objectiveType} objectives must be tied to a(n) ${objectiveType} Squad360 taxonomy item endpoint`);

  return true;
}
