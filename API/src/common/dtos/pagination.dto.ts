export class PaginationDto {
    search?: string;
    page: number;
    limit: number;
    sortBy?: { key: string; order: 'asc' | 'desc' }[];
}