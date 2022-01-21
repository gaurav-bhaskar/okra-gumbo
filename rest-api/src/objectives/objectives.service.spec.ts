import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { CreateObjectiveDto } from './data-transfer-objects/create-objective.dto';
import { ObjectiveType } from './objective-type';
import { Objective } from './objective.entity';
import { ObjectivesService } from './objectives.service';
import { UpdateObjectiveDto } from './data-transfer-objects/update-objective.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
});

describe('ObjectivesService', () => {
  let service: ObjectivesService;
  let objectiveRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectivesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Objective), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<ObjectivesService>(ObjectivesService);
    objectiveRepository = module.get<MockRepository>(getRepositoryToken(Objective));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findObjectives', () => {
    describe('when passing in constraints', () => {
      it('should return all values that satisfy constraints', async () => {
        const objectiveType: ObjectiveType = ObjectiveType.ENTERPRISE;
        const expectedObjectives: Array<Objective> = [];

        objectiveRepository.find.mockReturnValue(expectedObjectives);

        const objectives: Array<Objective> = await service.findObjectives(objectiveType);
        expect(objectives).toEqual(expectedObjectives);
      });
    });
  });

  describe('createObjective', () => {
    describe('when passing in Objective metadata', () => {
      describe('if all of the data is correct', () => {
        it('should create a new entry in the database', async () => {
          const createObjectiveDto: CreateObjectiveDto = {
            name: 'objective 1',
            type: ObjectiveType.PORTFOLIO,
            isDraft: false,
            parent: new Objective()
          };
  
          objectiveRepository.create.mockReturnValue(new Objective());
          const objective: Objective = await service.createObjective(createObjectiveDto);
          expect(objectiveRepository.save).toHaveBeenCalledTimes(1);
        });
      });

      describe('otherwise', () => {
        describe('if incorrect parent has been passed', () => {
          it('should throw BadRequestException', async () => {
            const objectiveType: ObjectiveType = ObjectiveType.PORTFOLIO;
            const parentObjectiveType: ObjectiveType = ObjectiveType.ENTERPRISE;

            const expectedObjective: Objective = {
              id: 0,
              dateCreated: undefined,
              dateLastUpdated: undefined,
              dateDeleted: undefined,
              name: '',
              isDraft: false,
              type: objectiveType,
              squad360ApiEndpoint: '',
              parent: undefined,
              children: []
            };

            const createObjectiveDto: CreateObjectiveDto = {
              name: '',
              type: objectiveType,
              isDraft: false,
              parent: expectedObjective
            };

            objectiveRepository.create.mockReturnValue(expectedObjective);
            try {
              const objective: Objective = await service.createObjective(createObjectiveDto);
            } catch(err: any) {
              expect(err).toBeInstanceOf(BadRequestException);
              expect(err.message).toEqual(`${objectiveType} objectives must be tied to a(n) ${parentObjectiveType} objective`);
            }
          });
        });

        describe('if incorrect Squad360 API endpoint has been passed', () => {
          it('should throw BadRequestException', async () => {
            const objectiveType: ObjectiveType = ObjectiveType.PRODUCT;
            const createObjectiveDto: CreateObjectiveDto = {
              name: '',
              type: ObjectiveType.PORTFOLIO,
              isDraft: false,
              squad360ApiEndpoint: '/products/123'
            }
            const objective: Objective = {
              id: 0,
              dateCreated: undefined,
              dateLastUpdated: undefined,
              dateDeleted: undefined,
              name: '',
              isDraft: false,
              type: ObjectiveType.PORTFOLIO,
              squad360ApiEndpoint: '/products/123',
              parent: new Objective(),
              children: []
            };

            objectiveRepository.create.mockReturnValue(objective);
            try {
              await service.createObjective(createObjectiveDto);
              fail('wrong Squad360 API endpoint');
            } catch(err: any) {
              expect(err).toBeInstanceOf(BadRequestException);
            }
          });
        });
      });
    });
  });

  describe('updateObjectives', () => {
    describe('when wanting to update Objective with valid ID', () => {
      describe('if all of the data is correct', () => {
        it('should update the Objective entry', async () => {
          const updateObjectiveDto: UpdateObjectiveDto = {};
          const objectiveId: number = 1;
  
          objectiveRepository.preload.mockReturnValue(new Objective());
          const objective: Objective = await service.updateObjective(objectiveId, updateObjectiveDto);
          expect(objectiveRepository.save).toHaveBeenCalled();
        });
      });

      describe('otherwise', () => {
        describe('if updating Objective to the wrong parent objective', () => {
          it('should throw BadRequestException', async () => {
            const objectiveId: number = 1;
            const parentObjective: Objective = {
              id: 0,
              dateCreated: undefined,
              dateLastUpdated: undefined,
              dateDeleted: undefined,
              name: '',
              isDraft: false,
              type: ObjectiveType.ENTERPRISE,
              squad360ApiEndpoint: '',
              parent: new Objective,
              children: []
            };
            const updateObjectiveDto: UpdateObjectiveDto = {
              parent: parentObjective
            };
            const objective: Objective = {
              id: 0,
              dateCreated: undefined,
              dateLastUpdated: undefined,
              dateDeleted: undefined,
              name: '',
              isDraft: false,
              type: ObjectiveType.PRODUCT_GROUP,
              squad360ApiEndpoint: '',
              parent: parentObjective,
              children: []
            };

            objectiveRepository.preload.mockReturnValue(objective);
            try {
              await service.updateObjective(objectiveId, updateObjectiveDto);
              fail('wrong parent objective type');
            } catch(err: any) {
              expect(err).toBeInstanceOf(BadRequestException);
            }
          });
        });

        describe('if updating Objective to the wrong Squad360 API endpoint', () => {
          it('should throw BadRequestException', async () => {
            const endpoint: string = '/product-groups/123';
            const objectiveId: number = 1;
            const updateObjectiveDto: UpdateObjectiveDto = {
              squad360ApiEndpoint: endpoint
            };
            const objective: Objective = {
              id: 0,
              dateCreated: undefined,
              dateLastUpdated: undefined,
              dateDeleted: undefined,
              name: '',
              isDraft: false,
              type: ObjectiveType.PRODUCT,
              squad360ApiEndpoint: endpoint,
              parent: new Objective,
              children: []
            };

            objectiveRepository.preload.mockReturnValue(objective);
            try {
              await service.updateObjective(objectiveId, updateObjectiveDto);
              fail('incorrect Squad360 API endpoint');
            } catch(err: any) {
              expect(err).toBeInstanceOf(BadRequestException);
            }
          });
        });
      });
    });

    describe('otherwise', () => {
      it('should throw NotFoundException', async () => {
        const updateObjectiveDto: UpdateObjectiveDto = {};
        const objectiveId: number = 1;

        objectiveRepository.preload.mockReturnValue(undefined);
        try {
          await service.updateObjective(objectiveId, updateObjectiveDto);
        } catch(err: any) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Objective ${objectiveId} does not exist`);
        }
      });
    })
  });

  describe('deleteObjectives', () => {
    describe('when given an id to delete', () => {
      it('should delete specified objectives from the database', async () => {
        const id: number = 1;
        const expectedResponse: DeleteResult = { raw: undefined };

        objectiveRepository.delete.mockReturnValue(expectedResponse);
        const response: DeleteResult = await service.deleteObjective(id);
        expect(response).toEqual(expectedResponse);
      });
    });
  });
});
