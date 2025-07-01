import Joi from "joi";

const jobAddDto = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    companyName: Joi.string().required(),
    category: Joi.number().required(),
    url: Joi.string().uri().allow(null).optional()
});

export default jobAddDto;