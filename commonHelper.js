const bcrypt = require('bcrypt');

module.exports = {
    async generatePasswordHash(plainPassword) {
        let salt = bcrypt.genSaltSync(11);
        return bcrypt.hashSync(plainPassword, salt);
    },

    async comparePasswordHash(plainPassword, hash) {
        return bcrypt.compareSync(plainPassword, hash);
    }
}