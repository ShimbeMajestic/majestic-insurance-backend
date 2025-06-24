import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    firstName!: string;

    @Column({ type: "varchar" })
    lastName!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;


    @Column({ type: "varchar", default: 'user' })
    role!: string;

    @Column({ type: "varchar", nullable: true })
    nationalIdNo?: string;

    @Column({ type: "varchar" })
    mobileNo!: string;

    @Column({ type: "varchar", nullable: true })
    gpsCoordinates?: string;

    @Column({ type: "simple-array", nullable: true })
    confirmationImages?: string[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}