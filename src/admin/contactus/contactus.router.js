import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import contactusController from "./contactus.controller.js";
import validator from "../../common/config/joi-validator.config.js";
const router = Router();

router.get('/list',asyncWrap(contactusController.list));

export default router;
