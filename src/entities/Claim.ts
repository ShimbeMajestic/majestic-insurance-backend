import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Policy } from "./Policy";

@Entity()
export class Claim {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    claimNumber!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: "varchar", default: 'pending' })
    status!: string;

    @Column({ type: "date" })
    incidentDate!: Date;

    @ManyToOne(() => Policy, { eager: true })
    policy!: Policy;

    @ManyToOne(() => User, { eager: true })
    claimant!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}