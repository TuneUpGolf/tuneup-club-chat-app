const joi = require("joi");

exports.createUser = joi.object({

  userId: joi.string(),
  name: joi
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),

  email: joi
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .email()
    .required(),

  country: joi
    .string()
    .regex(/^[a-zA-Z\s]+$/)
    .optional(),

  country_code: joi
    .string()
    .regex(/^[A-Z]{2,3}$/)
    .optional(),

  dial_code: joi
    .string()
    .regex(/^\+?[0-9]{1,5}$/)
    .optional(),

  phone: joi
    .string()
    .regex(/^\d{7,15}$/)
    .required(),

  avatar: joi
    .string()
    .uri()
    .optional(),

  lang: joi
    .string()
    .default("en"),

  plan_id: joi
    .string()
    .optional(),

  plan_expired_date: joi
    .date()
    .optional(),

  active_status: joi
    .boolean()
    .default(true),

  type: joi
    .string()
    .valid("admin", "user", "moderator")
    .default("user"),

  created_at: joi
    .date()
    .optional(),

  updated_at: joi
    .date()
    .optional(),
});

exports.updateUser = joi.object({
  _id: joi.string().hex().length(24).optional(),
  name: joi
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),

  email: joi
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .email()
    .required(),

  country: joi
    .string()
    .regex(/^[a-zA-Z\s]+$/)
    .optional(),

  country_code: joi
    .string()
    .regex(/^[A-Z]{2,3}$/)
    .optional(),

  dial_code: joi
    .string()
    .regex(/^\+?[0-9]{1,5}$/)
    .optional(),

  phone: joi
    .string()
    .regex(/^\d{7,15}$/)
    .required(),

  avatar: joi
    .string()
    .uri()
    .optional(),

  lang: joi
    .string()
    .default("en"),

  plan_id: joi
    .string()
    .optional(),

  plan_expired_date: joi
    .date()
    .optional(),

  active_status: joi
    .boolean()
    .default(true),

  type: joi
    .string()
    .valid("admin", "user", "moderator")
    .default("user"),

  created_at: joi
    .date()
    .optional(),

  updated_at: joi
    .date()
    .optional(),
});
exports.getUser = joi.object({
  userId: joi.string().required(),
});



exports.getUserJwt = joi.object({
  uuid: joi
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    )
    .required(),
})



exports.deleteUser = joi.object({
  userId: joi.string().required(),
})
