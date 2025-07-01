import jwt from 'jsonwebtoken';
import knex from '../config/database.config.js';
const adminAuthentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({ status: false, message: "unauthorized,please pass token" });
      }
      const token = await req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json({ status: false, message: "unauthorized,invalid token" });
      }
      const decodedJwtToken = await jwt.decode(token);
      if (decodedJwtToken===null || !decodedJwtToken.sub) {
        return res.json({ status: false, message: "unauthorized,invalid token!" });
      }
      const admin = await knex('admin').where('id', decodedJwtToken.sub).first()
      if (!admin) {
        return res.json({ status: false, message: "token of admin doesn't exist" })
      }
      if (admin) {
        req.admin = {
          id: admin.id,
          type: admin.type
        }
        return next()
      } else {
        return res.json({ status: false, message: "Invalid admin Token" })
      }
};

export default adminAuthentication;