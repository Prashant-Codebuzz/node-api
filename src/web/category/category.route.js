import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import categoryController from "./category.controller.js";
const router = Router();

router.get('/list', asyncWrap(categoryController.list));

export default router;
