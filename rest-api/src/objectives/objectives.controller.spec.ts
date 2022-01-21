import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';
import { ObjectivesServiceStub } from './stub-classes/objectives.service.stub';

describe('ObjectivesController', () => {
  let controller: ObjectivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectivesController],
      providers: [
        {
          provide: ObjectivesService,
          useValue: ObjectivesServiceStub
        }
      ]
    }).compile();

    controller = module.get<ObjectivesController>(ObjectivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
