import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import loginDto from "../auth/dto/login.dto.js"
import validator from "../../common/config/joi-validator.config.js";
import adminController from "../auth/admin.controller.js"

const router = Router();

router.post('/login',validator.body(loginDto),asyncWrap(adminController.login))
router.get('/dashboard',asyncWrap(adminController.dashboard))

export default router;