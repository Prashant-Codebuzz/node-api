import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  time: Joi.string().required(),
  gender: Joi.string().required(),
  coverLatter: Joi.string().required(),
  jobId: Joi.number().integer().required(),
  resume :Joi.string().allow(null,'')
});

export default schema;
