import type { GetPaginatedResponse } from "./GetPaginatedResponse";

export interface StudentsResponse {
    id: number,
    name: string,
    email: string,
    studentRegistration: string
    document: string
}

export interface GetStudentsResponse extends GetPaginatedResponse {
    data: StudentsResponse[]
}
