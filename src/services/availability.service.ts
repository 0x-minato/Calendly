import {
    CreateAvailabilityExceptionDto,
    CreateAvailabilityRuleDto,
    UpdateAvailabilityExceptionDto,
    UpdateAvailabilityRuleDto,
} from "../dtos/availability.dto.js"
import {
    createException as createExceptionRepo,
    createRule as createRuleRepo,
    findExceptionById,
    findExceptionsByUser,
    findRuleById,
    findRulesByUser,
    removeException as removeExceptionRepo,
    removeRule as removeRuleRepo,
    updateException as updateExceptionRepo,
    updateRule as updateRuleRepo,
} from "../repositories/availability.repository.js"
import { startRegenerateHostSlotsWorkflow } from "../temporal/client.js"
import { forbidden, notFound } from "../utils/api-error.js"

export async function listRules(userId: number) {
    return findRulesByUser(userId)
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    const createRule = createRuleRepo(userId, data)
    await startRegenerateHostSlotsWorkflow({hostId: userId})
    return createRule
}

export async function removeRule(userId: number, id: number) {
    const rule = await findRuleById(id)
    if (!rule) {
        throw notFound('availability rule not found')
    }
    if (rule.userId !== userId) {
        throw forbidden('you are not authorized to remove this rule')
    }
    const removeRule = removeRuleRepo(id)
    await startRegenerateHostSlotsWorkflow({hostId: userId})
    return removeRule
}

export async function updateRule(userId: number, id: number, data: UpdateAvailabilityRuleDto) {
    const rule = await findRuleById(id)
    if (!rule) {
        throw notFound('availability rule not found')
    }
    if (rule.userId !== userId) {
        throw forbidden('you are not authorized to update this rule')
    }
    return updateRuleRepo(id, data)
}

export async function listExceptions(userId: number) {
    return findExceptionsByUser(userId)
}

export async function createException(userId: number, data: CreateAvailabilityExceptionDto) {
    const createException = createExceptionRepo(userId, data)
    await startRegenerateHostSlotsWorkflow({hostId: userId})
    return createException
}

export async function removeException(userId: number, id: number) {
    const exception = await findExceptionById(id)
    if (!exception) {
        throw notFound('availability exception not found')
    }
    if (exception.userId !== userId) {
        throw forbidden('you are not authorized to remove this exception')
    }
    const removeException = removeExceptionRepo(id)
    await startRegenerateHostSlotsWorkflow({hostId: userId})
    return removeException
}

export async function updateException(userId: number, id: number, data: UpdateAvailabilityExceptionDto) {
    const exception = await findExceptionById(id)
    if (!exception) {
        throw notFound('availability exception not found')
    }
    if (exception.userId !== userId) {
        throw forbidden('you are not authorized to update this exception')
    }
    const updateException = updateExceptionRepo(id, data)
    await startRegenerateHostSlotsWorkflow({hostId: userId})
    return updateException
}
