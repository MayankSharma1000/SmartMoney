const Joi = require("joi");

const expenseSchema = Joi.object({

  title: Joi.string()

    .min(3)

    .max(100)

    .required(),

  amount: Joi.number()

    .positive()

    .required(),

  category: Joi.string()

    .required(),

  date: Joi.date()

});

module.exports = expenseSchema;