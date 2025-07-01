import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import contactusController from "./contactus.controller.js";
import validator from "../../common/config/joi-validator.config.js";
import contactusDto from "./dto/contactus.dto.js"
const router = Router();

router.post('/',validator.body(contactusDto) ,asyncWrap(contactusController.contactus));

export default router;
