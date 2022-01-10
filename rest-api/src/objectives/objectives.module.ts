import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectivesService } from './objectives.service';
import { ObjectivesController } from './objectives.controller';
import { Objective } from './objective.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Objective])
  ],
  providers: [ObjectivesService],
  controllers: [ObjectivesController]
})
export class ObjectivesModule {}
