export interface User {
    uId: string
    name: string |  null
    email: string |  null
    picture: string | undefined | null
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



/**
 * @Search for  this comments  TSDoc
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */