import { DataSource, DeepPartial, FindOptionsWhereProperty, ObjectLiteral, Repository } from "typeorm";


export abstract class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    
    constructor(dataSource: DataSource, entity: new() => T) {
        this.repository = dataSource.getRepository(entity);
    }

     async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number | string): Promise<T | null> {
        return this.repository.findOneBy({ id } as FindOptionsWhereProperty<T>);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async update(id: number | string, data: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (!entity) return null;
        Object.assign(entity, data);
        return this.repository.save(entity);
    }

    async delete(id: number | string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
