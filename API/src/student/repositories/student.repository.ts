import { DataSource, ILike, Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { BaseRepository } from "../../common/repositories/BaseRepository";
import { PaginationDto } from "../../common/dtos/pagination.dto";

export class StudentRepository extends BaseRepository<Student> {
    constructor(dataSource: DataSource) {
        super(dataSource, Student);
    }

     async findAllStudent(paginationDto: PaginationDto) {
        const {search, page, limit, sortBy} = paginationDto;
        const where: any = {};
        if (search) {
            where.name = ILike(`%${search}%`);
        }

        let order: any = {};
        if (sortBy && sortBy.length > 0) {
            const key = sortBy[0]?.key ?? '';
            const direction = sortBy[0]?.order ?? 'asc';
            if (key) {
                order[key] = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            }
        }

        const [data, total] = await this.repository.findAndCount({
            where: where,
            take: limit,
            skip: (page - 1) * limit,
            order,
        });

        return {
            data,
            page: +page,
            limit: +limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findLastStudents() {
        const students = await this.repository.createQueryBuilder("student")
                .orderBy("student.id", "DESC")
                .take(3)
                .select(["student.id", "student.name", "student.course"])
                .getMany();
        return students;
    }

    async count() {
        const students = await this.repository.count();
        return students;
    }

    async totalCourses() {
        const { total_courses } = await this.repository
        .createQueryBuilder("student")
        .select("COUNT(DISTINCT student.course)", "total_courses")
        .getRawOne();
        return total_courses;
    }
}