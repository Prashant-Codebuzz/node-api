import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import knex from "../../common/config/database.config.js";

// knex()
class AdminController{
    /**
     * login
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async login(req,res){
        try{
            const { email, password } = req.body

               const secret_key = process.env.JWT_SECRET_KEY
                const admin = await knex('admin').where('email', email).first()
                if (!admin) {
                    return res.json({ status: false, message: "Admin not exist" })
                }
                if (admin.password != password) {
                     return res.json({ status: false, message: "password doesn't match" })
                }
                
                var token;
                if (admin.token === null) {
                    const jti = randomBytes(32).toString("hex");
                    token = await jwt.sign(
                        {
                            sub: admin.id,
                            jti,
                            email: admin.email,
                            type: "admin"
                        },
                        secret_key,
                        {
                            expiresIn: "365 days",
                        })
                    await knex('admin').update({ token: token }).where('id', admin.id)
                } else {
                    token = admin.token
                }
                return res.send({
                    status: true,
                    message: "success",
                    token: token
                })
            
        }catch(err){
            return res.json({status:false,message:"Admin can't login,error occured"})
        }
    }
    /**
     * Dashboard count
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async dashboard(req, res){
        try{
            const category = await knex('category')
            const job = await knex('jobs')
            const subscribe = await knex('subscribe')
            const blog = await knex('blog')
            const categoryCount = category.length ? category.length : 0;
            const jobCount = job.length ? job.length : 0;
            const subscribeCount = subscribe.length ? subscribe.length : 0;
            const blogCount = blog.length ? blog.length : 0;
            return res.json({
                status: true,
                message: "Dashboard counts fetched successfully",
                data: {
                    categoryCount: categoryCount,
                    jobCount: jobCount,
                    subscribeCount: subscribeCount,
                    blogCount: blogCount
                }
            })
        }catch(error){
            return res.json({status:false,message:"Can't get dashboard count"})
        }
    }
}


export default new AdminController();