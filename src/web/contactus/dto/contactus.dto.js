import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export default schema;
