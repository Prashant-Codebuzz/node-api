import express from "express";
import validator from "../../common/config/joi-validator.config.js";
import asyncWrap from "express-async-wrapper";
import subscribeController from "./subscribe.controller.js";
import subscribeDto from "./dto/subscribe.dto.js"
const router = express.Router();

router.post('/',validator.body(subscribeDto),asyncWrap(subscribeController.subscribe))

export default router;