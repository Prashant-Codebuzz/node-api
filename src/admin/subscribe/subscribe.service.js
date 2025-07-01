import moment from 'moment-timezone';
import knex from "../../common/config/database.config.js"

class SubscribeService {
   async list() {
      try {
         const data = await knex('subscribe')

         data.forEach(i => {
            i.createdAt = moment.utc(i.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
         });
         
         return ({ status: true, message: "success", data })
      } catch (error) {
         return ({ status: false, message: "something went wrong can't get subscribers" })
      }
   }
}

export default new SubscribeService();