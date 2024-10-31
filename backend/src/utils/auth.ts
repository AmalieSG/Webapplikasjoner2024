// utils/auth.ts

import { users } from "../data/users"
import { UserType } from "./types"


const parseCookie = (cookie: string) => {
    return Object.fromEntries(
        cookie.split(';').map((cookie) => cookie.trim().split('='))
    )
}

export function getUser(request: Request): UserType | null {
    const cookies = parseCookie(request.headers.get('Cookie') ?? '')
    const name = cookies['user.name']
    return users.find((user: UserType) => user.name === name) ?? null
}