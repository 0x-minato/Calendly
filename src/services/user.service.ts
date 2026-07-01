import slug from "slug"
import { createUserDto, updateUserDto } from "../dtos/user.dto.js"
import { createNewUser, deleteUserById, findByEmail, getAll, getUserById, updateUserById } from "../repositories/user.repository.js"
import { conflict, notFound } from "../utils/api-error.js"

export async function findAllUsers() {
    const users = await getAll()
    return users
}

export async function getUser(id: number) {
    const user = await getUserById(id)
    if (!user) {
        throw notFound('User not found')
    }
    return user
}

export async function createUser(data: createUserDto) {
    let existingUser = await findByEmail(data.email)
    if (existingUser) throw conflict("user already exists")
    const slugPassed = data.slug ? data.slug : slug(data.name, {lower: true}) // todo : make the slug unique
    return createNewUser({...data, slug: slugPassed })
}

export async function updateUser(id: number, data: updateUserDto) {
    const user = await getUserById(id)
    if (!user) throw notFound('User not found')

    if (data.email) {
        const existingUser = await findByEmail(data.email)
        if (existingUser && existingUser.id !== id) throw conflict("user already exists")
    }

    return updateUserById(id, data)
}

export async function deleteUser(id: number) {
    const user = await getUserById(id)
    if (!user) throw notFound('User not found')

    return deleteUserById(id)
}
