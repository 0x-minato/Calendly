import { prisma } from '../config/database.js'
import { createUserDto, updateUserDto } from '../dtos/user.dto.js'

export async function getAll() {
    const users = await prisma.user.findMany()
    return users
}

export async function getUserById(id: number) {
    let user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return user
}

export async function findByEmail(email: string) {
    let user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    return user
}

export async function createNewUser(data: createUserDto & { slug: string}) {
    const user = await prisma.user.create({
        data
    })

    return user
}

export async function updateUserById(id: number, data: updateUserDto) {
    const user = await prisma.user.update({
        where: { id },
        data,
    })

    return user
}

export async function deleteUserById(id: number) {
    const user = await prisma.user.delete({
        where: { id },
    })

    return user
}