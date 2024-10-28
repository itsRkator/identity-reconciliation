import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true, name: "phone_number", type: "varchar" })
  phoneNumber: string;

  @Column({ nullable: true, name: "email", type: "varchar" })
  email: string;

  @Column({ nullable: true, type: "int", name: "linked_id" })
  linkedId: number;

  @Column({
    type: "enum",
    enum: ["primary", "secondary"],
    default: "primary",
    name: "linked_precedence",
  })
  linkPrecedence: "primary" | "secondary";

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
