import api from '../axios'
import { API_ENDPOINTS } from '../endpoints'
import { PaginationForm } from '../forms/PaginationForm';
import type { UpdateStudentForm } from '../forms/UpdateStudentForm';
import type { CreateStudentForm } from '../forms/CreateStudentForm';
import type { GetStudentsResponse } from '../responses/GetStudentsResponse';
import type { GetStudentByIdResponse } from '../responses/GetStudentByIdResponse';


export const updateStudent = async(id: number, student: UpdateStudentForm) => {
    const route = `${API_ENDPOINTS.STUDENT.UPDATE}`.replace(':id', id.toString())
    const { data } = await api.patch(route, student);
    return data;
}

export const createStudent = async(student: CreateStudentForm) => {
    const { data } = await api.post(API_ENDPOINTS.STUDENT.CREATE, student);
    return data;
}

export const getStudentById = async(id: number) : Promise<GetStudentByIdResponse> => {
    const { data } = await api.get(`${API_ENDPOINTS.STUDENT.GET_BY_ID}`.replace(':id', id.toString()));
    return data;
}

export const getStudents = async(paginationForm: PaginationForm) : Promise<GetStudentsResponse> => {
    const {data} = await api.get(API_ENDPOINTS.STUDENT.GET_ALL, {
        params: paginationForm
    })
    return data;
}

export const deleteStudent = async(id: number) => {
    const route = `${API_ENDPOINTS.STUDENT.DELETE}`.replace(':id', id.toString())
    const { data } = await api.delete(route);
    return data;
}