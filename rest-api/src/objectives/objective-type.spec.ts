import { BadRequestException } from "@nestjs/common";
import { ObjectiveType, validateParentObjectiveType, validateSquad360ApiEndpoint } from "./objective-type";

describe('ObjectiveType', () => {
  describe('validateParentObjectiveType', () => {
    describe('if Objective is supposed to have a parent', () => {
      describe('if the parent has the wrong objective type', () => {
        it('should throw BadRequestException', () => {
          const objectiveType: ObjectiveType = ObjectiveType.PRODUCT;
          try {
            validateParentObjectiveType(objectiveType, ObjectiveType.ENTERPRISE);
            fail('Wrong parent type');
          } catch(err: any) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toEqual(`${objectiveType} objectives must be tied to a(n) ${ObjectiveType.PORTFOLIO} objective`);
          }
        });
      });

      describe('if the parent has the right objective type', () => {
        it('should not throw exception', () => {
          const objectiveType: ObjectiveType = ObjectiveType.PORTFOLIO;
          expect(() => validateParentObjectiveType(objectiveType, ObjectiveType.ENTERPRISE)).not.toThrow(BadRequestException);
        });
      });
    });

    describe('if Objective is not supposed to have a parent', () => {
      describe('if trying to assign a parent objective', () => {
        it('should throw BadRequestException', () => {
          const objectiveType: ObjectiveType = ObjectiveType.ENTERPRISE;
          try {
            validateParentObjectiveType(objectiveType, ObjectiveType.ENTERPRISE);
            fail('should not be assigned a parent objective');
          } catch(err: any) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toEqual(`${objectiveType} objectives cannot be tied to a higher level objective`);
          }
        });
      });

      describe('if no parent objective type is passed', () => {
        it('should not throw exception', () => {
          expect(() => validateParentObjectiveType(ObjectiveType.ENTERPRISE, null)).not.toThrow(BadRequestException);
        });
      })
    });
  });

  describe('validateSquad360ApiEndpoint', () => {
    describe('if Objective can be tied to a Squad360 taxonomy item', () => {
      describe('if the Objective is tied to the wrong Squad360 taxonomy item', () => {
        it('should throw BadRequestException', () => {
          expect(() => validateSquad360ApiEndpoint(ObjectiveType.PRODUCT, '/product-groups/123')).toThrow(BadRequestException);
        });
      });

      describe('if the Objective is tied to the correct Squad360 taxonomy item', () => {
        it('should not throw BadRequestException', () => {
          expect(() => validateSquad360ApiEndpoint(ObjectiveType.PRODUCT, '/products/123')).not.toThrow(BadRequestException);
        });
      });
    });

    describe('if Objective is not supposed to be tied to a Squad360 taxonomy item', () => {
      describe('if an endpoint is provided', () => {
        it('should throw BadRequestException', () => {
          expect(() => validateSquad360ApiEndpoint(ObjectiveType.PORTFOLIO, 'does not matter')).toThrow(BadRequestException);
        });
      });

      describe('if an endpoint is not provided', () => {
        it('should not throw BadRequestException', () => {
          expect(() => validateSquad360ApiEndpoint(ObjectiveType.ENTERPRISE, null)).not.toThrow(BadRequestException);
        });
      });
    });
  });
});