const jsonWebToken = require('jsonwebtoken')
const SECRET = 'Kary' // 撒盐：加密的时候混淆
const auth = {
    setToken: user => {
        return jsonWebToken.sign({ user }, SECRET, { expiresIn: 60 * 30 })
    },
    checkToken: token => {
        if (!token) return false

        // jsonWebToken.verify(token, SECRET, function(err, decoded) {
        //     if (!err) return false
        //     console.log(decoded.user)
        //     return true
        // })

        let decoded = jsonWebToken.decode(token, SECRET)
        console.log('decoded', decoded)
        if (decoded.exp <= Date.now() / 1000) return false
        return true
    }
}

module.exports = auth