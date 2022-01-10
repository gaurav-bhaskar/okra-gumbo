import { BadRequestException } from "@nestjs/common";

export enum ObjectiveType {
  ENTERPRISE = 'Enterprise',
  PORTFOLIO = 'Portfolio',
  PRODUCT_GROUP = 'Product Group',
  PRODUCT = 'Product'
}

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

export function validateParentObjectiveType(objectiveType: ObjectiveType, parentObjectiveType: ObjectiveType): void {
  const expectedParentObjectiveType: ObjectiveType = getParentObjectiveType(objectiveType);

  if(expectedParentObjectiveType && (expectedParentObjectiveType !== parentObjectiveType))
    throw new BadRequestException(`${objectiveType} objectives must be tied to a(n) ${expectedParentObjectiveType} objective`);
}

export function validateSquad360ApiEndpoint(endpoint: string): void {
  
}
