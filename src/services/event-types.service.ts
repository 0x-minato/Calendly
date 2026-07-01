import slug from "slug";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";
import { create, deleteById, findActiveByHostAndSlug, findHostById, getById, slugExistsForHost, update } from "../repositories/event-type.repository.js";
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";

export async function listEventTypes(hostId: number) {
    const eventTypes = await findHostById(hostId)
    return eventTypes
}

export async function createEventType(hostId: number, data: CreateEventTypeDto) {
    const slugPassed = data.slug ?? slug(data.title, { lower: true })
    if (!slugPassed) {
        throw conflict('could not generate a slug for event type')
    }
    const isSlugTaken = await slugExistsForHost(slugPassed, hostId)
    if (isSlugTaken) {
        throw conflict('event type for this slug already exist, please use a different slug')
    }
    return create(hostId, {...data, slug: slugPassed})
}

export async function removeEventType(hostId: number, id: number) {
    const eventType = await getById(id)
    if (!eventType) {
        throw notFound('event not found')
    }
    if (eventType.hostId != hostId) {
        throw forbidden('you are not authorized to remove this event')
    }
    return deleteById(id)
}

export async function getEventTypeById(id: number, hostId: number) {
    const eventType = await getById(id)
    if (!eventType)
        throw notFound('event type not found')
    if (eventType.hostId !== hostId)
        throw forbidden('you are not authorized to view this event')
    return eventType
}

export async function updateEventType(hostId: number, id: number, data: UpdateEventTypeDto) {
    const eventType = await getById(id)
    if (!eventType)
        throw notFound('event type not found')
    if (eventType.hostId !== hostId)
        throw forbidden('you are not authorized to update this event')

    if (data.slug && data.slug !== eventType.slug) {
        const isSlugTaken = await slugExistsForHost(data.slug, hostId)
        if (isSlugTaken)
            throw conflict('event type for this slug already exist, please use a different slug')
    }

    return update(id, data)
}

export async function getEventTypePublic(hostId: number, eventSlug: string) {
    const eventType = await findActiveByHostAndSlug(hostId , eventSlug)
    if (!eventType)  
        throw notFound('Event Type not found')
    const user = await getUserById(hostId)
    if (!user) {
        throw notFound('user for host id not found')
    }

    return {
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationMinutes: eventType.durationMinutes,
            locationType: eventType.locationType
        },
        host: {
            name: user.name,
            email: user.email
        }
    }
}