import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student') 
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text', unique: true})
    email: string;

    @Column({type: 'text', unique: true, name:'student_registration'})
    studentRegistration: string;

    @Column({type: 'text', unique: true})
    document: string;

    @Column({type: 'text', nullable: true})
    cellphone: string;

    @Column({type: 'text', nullable: true})
    course: string;
}