import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity()
export class Policy extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    policyNumber!: string;

    @Column({ type: "varchar" })
    type!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    premium!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    coverage!: number;

    @Column({ 
        type: 'timestamp with time zone',
        transformer: {
            to: (value: Date) => value,
            from: (value: Date) => value ? new Date(value).toISOString() : null
        }
    })
    startDate!: string;

    @Column({ 
        type: 'timestamp with time zone',
        transformer: {
            to: (value: Date) => value,
            from: (value: Date) => value ? new Date(value).toISOString() : null
        }
    })
    endDate!: string;

    @Column({ type: "varchar", default: 'active' })
    status!: string;

    @ManyToOne(() => User, { eager: true })
    policyholder!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}