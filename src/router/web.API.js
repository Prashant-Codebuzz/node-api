import { Router } from "express";
const router = Router();
import jobRouter from "../web/job/job.router.js"
import blogRouter from "../web/blog/blog.router.js"
import categoryRoute from "../web/category/category.route.js"
import contactusRoute  from "../web/contactus/contactus.router.js"
import subscribeRoute from "../web/subscribe/subscribe.route.js"

router.use('/job',jobRouter)

router.use('/blog',blogRouter)

router.use('/category',categoryRoute)

router.use('/contact-us',contactusRoute)

router.use('/subscribe',subscribeRoute)

export default router;
