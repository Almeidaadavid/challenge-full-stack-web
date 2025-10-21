export class PaginationForm {
    search?: string = '';
    page: number = 1;
    limit: number = 10;
    sortField?: string; 
    order?: 'asc' | 'desc';
}