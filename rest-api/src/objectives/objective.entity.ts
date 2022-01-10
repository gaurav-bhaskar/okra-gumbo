import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectiveType } from "./objective-type";

@Entity()
export class Objective {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateLastUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;

  @Column()
  name: string;

  @Column()
  isDraft: boolean;

  @Column({
    type: 'enum',
    enum: ObjectiveType
  })
  type: ObjectiveType;

  @Column({nullable: true})
  squad360ApiEndpoint: string;

  @ManyToOne(() => Objective, (obj: Objective) => obj.children)
  parent: Objective;

  @OneToMany(() => Objective, (obj: Objective) => obj.parent)
  children: Array<Objective>;
}
