const Joi = require('@hapi/joi');

// password menggunakan searching => password regex temukan di stack overflow
//  ini digunakan untuk membatasi spesifikasi minimal sebuah password
const schema = Joi.object({
    username: Joi.string().alphanum().required().min(3).max(10),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    )
        .message('Your password must at least 8 characters and contain at least one upper case letter, one lower case letter, one number and one special character')
        .required(),
    name: Joi.string().required(),
});

const logSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = { 
    schema, logSchema 
};