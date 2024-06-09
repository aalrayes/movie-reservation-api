const joi = require("joi");

const reservationSchema = joi.object.keys({
  numberOfPeople: joi.number().min(1).max(30).required()
})

module.exports = reservationSchema
