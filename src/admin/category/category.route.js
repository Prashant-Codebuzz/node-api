import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import categoryController from "./category.controller.js";
import validator from "../../common/config/joi-validator.config.js";
import categoryAddDto from "./dto/categoryAdd.js"
const router = Router();

router.post('/add', validator.body(categoryAddDto), asyncWrap(categoryController.add));
router.get('/list', asyncWrap(categoryController.list));
router.put('/edit/:id', asyncWrap(categoryController.edit));
router.delete('/delete/:id', asyncWrap(categoryController.delete));

export default router;
