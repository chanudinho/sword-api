const yup = require('yup')

class UserValidation {
    static async userCreateValidation(user) {
        const schema = yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6, 'Password must be at least 6 characters'),
            role: yup.string().oneOf(['manager', 'technician']).required()
        })

        return schema.validate(user)
    }
}

module.exports = UserValidation
