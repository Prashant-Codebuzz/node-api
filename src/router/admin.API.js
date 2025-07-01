import { Router } from "express";
const router = Router();
import authRouter from "../admin/auth/admin.router.js"
import blogRoute from "../admin/blog/blog.route.js"
import categoryRoute from "../admin/category/category.route.js"
import jobRouter from "../admin/job/job.route.js"
import adminAuthentication from "../common/middlewares/admin.auth.middleware.js";
import contactusRoute from "../admin/contactus/contactus.router.js"
import subscribeRouter from "../admin/subscribe/subscribe.route.js"

router.use('/auth',authRouter)

router.use('/blog',adminAuthentication,blogRoute)

router.use('/category',adminAuthentication,categoryRoute)

router.use('/job',adminAuthentication,jobRouter)

router.use('/contact-us',adminAuthentication,contactusRoute)

router.use('/subscribe',adminAuthentication,subscribeRouter)

export default router;