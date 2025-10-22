import type { CreateStudentForm } from '../forms/CreateStudentForm'
import type { PaginationForm } from '../forms/PaginationForm'
import type { UpdateStudentForm } from '../forms/UpdateStudentForm'
import type { GetStudentByIdResponse } from '../responses/GetStudentByIdResponse'
import type { GetStudentsResponse } from '../responses/GetStudentsResponse'
import type { GetSummaryResponse } from '../responses/GetSummaryResponse'
import api from '../axios'
import { API_ENDPOINTS } from '../endpoints'

export async function updateStudent (id: number, student: UpdateStudentForm) {
  const route = `${API_ENDPOINTS.STUDENT.UPDATE}`.replace(':id', id.toString())
  const { data } = await api.patch(route, student)
  return data
}

export async function createStudent (student: CreateStudentForm) {
  const { data } = await api.post(API_ENDPOINTS.STUDENT.CREATE, student)
  return data
}

export async function getStudentById (id: number): Promise<GetStudentByIdResponse> {
  const { data } = await api.get(`${API_ENDPOINTS.STUDENT.GET_BY_ID}`.replace(':id', id.toString()))
  return data
}

export async function getStudents (paginationForm: PaginationForm): Promise<GetStudentsResponse> {
  const { data } = await api.get(API_ENDPOINTS.STUDENT.GET_ALL, {
    params: paginationForm,
  })
  return data
}

export async function deleteStudent (id: number) {
  const route = `${API_ENDPOINTS.STUDENT.DELETE}`.replace(':id', id.toString())
  const { data } = await api.delete(route)
  return data
}

export async function getSummary (): Promise<GetSummaryResponse> {
  const { data } = await api.get(API_ENDPOINTS.STUDENT.SUMMARY)
  return data
}
