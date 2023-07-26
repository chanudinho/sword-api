const bcrypt = require('bcryptjs')
const DefaultError = require('./defaultError')

class Crypto {
    static validateIfFieldExist(data) {
        if (data) return true

        throw new DefaultError('the field must always exist in the encryption module', 500)
    }

    static async encrypt(password) {
        this.validateIfFieldExist(password)

        const hashedPassword = await bcrypt.hash(`${password}`, 8)

        return hashedPassword
    }

    static async compareData(unencryptedData, cryptData) {
        this.validateIfFieldExist(unencryptedData)
        this.validateIfFieldExist(cryptData)

        const passwordMatched = await bcrypt.compare(`${unencryptedData}`, `${cryptData}`)

        return passwordMatched
    }
}

module.exports = Crypto
