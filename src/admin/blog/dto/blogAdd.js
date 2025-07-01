import Joi from "joi";

const blogAddDto = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().allow(null,''),
    description: Joi.string().required(),
    authorname: Joi.string().required(),
});

export default blogAddDto;