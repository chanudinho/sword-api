const yup = require('yup')

class TaskValidation {
    static async taskCreateValidation(task) {
        const schema = yup.object({
            title: yup.string().required().max(255),
            summary: yup.string().required().max(2500),
            userId: yup.number().typeError('userId needs to be a number').integer().required()
        })

        return schema.validate(task)
    }

    static async taskFindValidation(query) {
        const schema = yup.object({
            userId: yup.number().typeError('userId needs to be a number').integer(),
            title: yup.string(),
            taskId: yup.number().typeError('taskId needs to be a number').integer(),
            notDisplaySummary: yup.boolean().typeError('notDisplaySummary needs to be a boolean')
        })

        return schema.validate(query)
    }

    static async taskUpdateValidation(task) {
        const schema = yup.object({
            title: yup.string().nonNullable().max(255),
            summary: yup.string().nonNullable().max(2500),
            completedAt: yup.date().nonNullable(),
            taskId: yup.number().typeError('taskId needs to be a number').integer().required(),
            userId: yup.number().typeError('userId needs to be a number').integer().required()
        })

        return schema.validate(task)
    }

    static async deleteTaskValidation(query) {
        const schema = yup.object({
            taskId: yup.number().typeError('taskId needs to be a number').integer().required()
        })

        return schema.validate(query)
    }
}

module.exports = TaskValidation
