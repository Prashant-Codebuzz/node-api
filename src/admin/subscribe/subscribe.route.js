import express from "express";
import validator from "../../common/config/joi-validator.config.js";
import asyncWrap from "express-async-wrapper";
import subscribeController from "./subscribe.controller.js";
const router = express.Router();

router.get('/list',asyncWrap(subscribeController.list))

export default router;