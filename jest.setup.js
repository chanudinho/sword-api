require('dotenv').config({ path: 'env/.env.test' })

afterAll(async () => {
    await new Promise(resolve => {
        setTimeout(resolve, 500)
    })
})
