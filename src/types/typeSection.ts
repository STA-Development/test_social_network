export interface User {
    uId: string
    name: string
    email: string
    picture: string | undefined
}

export type Post = {
    title: string
    description: string
    photo: any //TODO FIX this SHit (try binary data)
    userId?: string | undefined
}

export type UserFromDB = {
    uId: string
    userName: string
    picture: string
}
export type UserPost = {
    id: number
    title: string
    description: string
    photo: string
    user: UserFromDB
    createdAt: string
    updatedAt: string
    userId: number
}

