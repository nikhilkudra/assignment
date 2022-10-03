const { Validator } = require('node-input-validator');
module.exports = {
    validateRegisterUser: async function (dataObj) {
        let { email, password} = dataObj
        const v = new Validator(dataObj, {
            email: 'required|email',
            password: 'required|minLength:10',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        } else {
            return {
                email: email.toLowerCase(),
                password: password,
            }
        }
    },

    validateLoginObj: async function (dataObj) {
        const v = new Validator(dataObj, {
            email: 'required|email',
            password: 'required|minLength:10',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        };
        return true;
    }
}