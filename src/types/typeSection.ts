export interface User {
    uId: string
    name: string
    email: string
    picture: string | undefined
}

export type Post = {
    title: string
    description: string
    photo: string
    userId: string | undefined
}

export type UserPost = {
    id: number
    title: string
    description: string
    photo: string
}
