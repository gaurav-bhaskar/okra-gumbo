import { NotFoundException } from '@nestjs/common';
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
  });

  describe('updateObjectives', () => {
    describe('when wanting to update Objective with valid ID', () => {
      it('should update the Objective entry', async () => {
        const updateObjectiveDto: UpdateObjectiveDto = {};
        const objectiveId: number = 1;

        objectiveRepository.preload.mockReturnValue(new Objective());
        const objective: Objective = await service.updateObjective(objectiveId, updateObjectiveDto);
        expect(objectiveRepository.save).toHaveBeenCalledTimes(1);
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
    describe('when given an array of IDs to delete', () => {
      it('should delete specified objectives from the database', async () => {
        const ids: Array<number> = [1,2,3];
        const expectedResponse: DeleteResult = { raw: undefined };

        objectiveRepository.delete.mockReturnValue(expectedResponse);
        const response: DeleteResult = await service.deleteObjectives(ids);
        expect(response).toEqual(expectedResponse);
      });
    });
  });
});
