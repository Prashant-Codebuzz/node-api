import { Router } from "express";
import asyncWrap from "express-async-wrapper";
import blogController from "./blog.controller.js";
import validator from "../../common/config/joi-validator.config.js";
import blogAddDto from "./dto/blogAdd.js"
const router = Router();

router.post('/add', validator.body(blogAddDto), asyncWrap(blogController.add));
router.get('/list', asyncWrap(blogController.list));
router.put('/edit/:id', asyncWrap(blogController.edit));
router.delete('/delete/:id', asyncWrap(blogController.delete));

export default router;
