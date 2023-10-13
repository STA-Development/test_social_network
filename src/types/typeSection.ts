export interface User {
    uId: string
    name: string |  null
    email: string |  null
    picture: string | undefined | null
}
export type Post = {
    title: string
    description: string
    photo: any
    userId?: string | undefined
}

export type UserFromDB = {
    uId: string
    userName: string
    picture: string
}
export type UserAditional ={
    id:number
    userName: string
    picture: string
    userIdToken: string
}
export type CommentFromDB = {
    id: number
    comment: string
    userId: number
    postId: number
    createdAt: string
    updatedAt: string
    user:UserAditional
}
export type UserPost = {
    id: number
    title: string
    description: string
    photo: string
    user: UserFromDB
    comments?: CommentFromDB
    createdAt: string
    updatedAt: string
    userId: number
}

export type SignUpValues = {
    username: string
    email: string
    password: string
}