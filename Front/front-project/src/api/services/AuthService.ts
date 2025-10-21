import api from '../axios'
import { API_ENDPOINTS } from '../endpoints'
import type { LoginPayload } from '../responses/LoginResponse';


export const loginUser = async(email: string, password: string) : Promise<LoginPayload> => {
    console.log(email);
    console.log(password);
    const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, {email, password});
    return data;
}