import express from "express";
import validator from "../../common/config/joi-validator.config.js";
import jobAddDto from "./dto/jobAddDto.js";
import asyncWrap from "express-async-wrapper";
import jobController from "./job.controller.js";

const router = express.Router();

router.post('/add', validator.body(jobAddDto), asyncWrap(jobController.add));
router.get('/list', asyncWrap(jobController.list));
router.put('/edit/:id', asyncWrap(jobController.edit));
router.delete('/delete/:id', asyncWrap(jobController.delete));
router.get('/job-seekers/:jobId',asyncWrap(jobController.jobseekers))

export default router;