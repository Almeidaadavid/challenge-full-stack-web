export interface JwtPayload {
    id: string;
}

export interface LoginPayload {
    token: string,
    user: UserLoginPayload
}


interface UserLoginPayload {
    id: number,
    name: string,
    email: string,
}

