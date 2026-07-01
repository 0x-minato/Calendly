import { prisma } from '../config/database.js'
import { CreateEventTypeDto, UpdateEventTypeDto } from '../dtos/event-type.dto.js'

export async function findHostById(hostId: number) {
    const eventTypes = await prisma.eventType.findMany({
        where: {
            hostId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return eventTypes
}

export async function getById(id: number) {
    const eventTypes = await prisma.eventType.findUnique({
        where: {
            id
        }
    })

    return eventTypes
}

export async function create(hostId: number, data: CreateEventTypeDto & { slug: string}) {
    const eventType = await prisma.eventType.create({
        data: {
            hostId,
            ...data
        }
    })
    return eventType
}

export async function update(id: number, data: UpdateEventTypeDto) {
    const eventType = await prisma.eventType.update({
        where: {
            id
        },
        data: data
    })

    return eventType
}

export async function deleteById(id: number) {
    const eventType = await prisma.eventType.delete({
        where: { id }
    })

    return eventType
}

export async function findByHostAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            hostId, slug
        }
    })

    return eventType
}

export async function findActiveByHostAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            hostId,
            slug,
            isActive: true,
        }
    })

    return eventType
}

export async function findActiveEvents() {
    const eventTypes = await prisma.eventType.findMany({
        where: {
            isActive: true
        }
    })

    return eventTypes
}

export async function slugExistsForHost(slug: string, hostId: number) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            hostId, slug
        }
    })

    return eventType !== null
}

export async function findActiveEventTypesByHost(hostId: number) {
    return prisma.eventType.findMany({
        where: {
            hostId,
            isActive: true
        }
    })
}