export  interface CreateStudentForm {
    name: string,
    email: string,
    studentRegistration: string,
    document: string,
    cellphone?: string,
    course?: string
}


export interface UpdateStudentForm {
    name: string,
    email: string,
    course?: string,
    cellphone?: string
}