import express from "express";
import validator from "../../common/config/joi-validator.config.js";
import asyncWrap from "express-async-wrapper";
import jobController from "./job.controller.js";

const router = express.Router();

router.get('/jobList', asyncWrap(jobController.jobList));
router.get('/job/:id', asyncWrap(jobController.jobDetails));
router.get('/latestJob', asyncWrap(jobController.latestJobs));
router.get('/categoryJobs/:id', asyncWrap(jobController.categoryJobs));
router.post('/jobSearcher',asyncWrap(jobController.jobSearcher))

export default router;