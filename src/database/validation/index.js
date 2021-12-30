const Joi = require("joi")

const authSchema = Joi.object({
     username: Joi.string().required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(4).required()
})
const authSchemaUpdate = Joi.object({
     username: Joi.string().required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(4).required(),
     id: Joi.number().required()
})
const authSchemaDelete = Joi.object({
     id: Joi.number().required(),

})

module.exports = {
     authSchema,
     authSchemaDelete,
     authSchemaUpdate
}