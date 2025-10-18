import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student') 
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text', unique: true})
    email: string;

    @Column({type: 'text', unique: true})
    Ra: string;

    @Column({type: 'text', unique: true})
    document: string;
}