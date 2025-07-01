import express from "express";
import validator from "../../common/config/joi-validator.config.js";
import asyncWrap from "express-async-wrapper";
import blogController from "./blog.controller.js";

const router = express.Router();

router.get('/list', asyncWrap(blogController.blogList));
router.get('/details/:id', asyncWrap(blogController.blogDetails));

export default router;