export class PaginationForm {
    search?: string = '';
    page: number = 1;
    limit: number = 10;
    sortBy?: { key: string; order: 'asc' | 'desc' }[];
}