import { prisma } from "../config/database.js";

export async function findBookedSlotsByHostInRange(hostId: number, startDate: Date, endDate: Date) {
    return prisma.slot.findMany({
        where: {
            hostId,
            startAt: {
                gte: startDate,
                lte: endDate,
            },
            status: "BOOKED",
        },
    });
}

export async function upsertAvailableSlot(data: {
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
}) {
    return prisma.slot.upsert({
        where: {
            eventTypeId_startAt_endAt: {
                eventTypeId: data.eventTypeId,
                startAt: data.startAt,
                endAt: data.endAt,
            },
        },
        create: {
            hostId: data.hostId,
            eventTypeId: data.eventTypeId,
            startAt: data.startAt,
            endAt: data.endAt,
            status: "AVAILABLE",
        },
        update: {
            status: "AVAILABLE",
        },
    });
}

export async function findAvailableOrBlockedSlotsByEventTypeInRange(
    eventTypeId: number,
    startDate: Date,
    endDate: Date,
) {
    return prisma.slot.findMany({
        where: {
            eventTypeId,
            startAt: { gte: startDate, lte: endDate },
            status: { in: ["AVAILABLE", "BLOCKED"] },
        },
    });
}

export async function blockSlotById(id: string) {
    return prisma.slot.update({
        where: { id },
        data: { status: "BLOCKED" },
    });
}
