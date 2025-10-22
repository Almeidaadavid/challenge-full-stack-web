export interface SummaryStudentResponse {
  id: number
  name: string
  course: string
}

export interface GetSummaryResponse {
  lastStudents: SummaryStudentResponse[]
  totalStudents: number
  totalCourses: string
}
