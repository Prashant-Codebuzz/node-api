import moment from 'moment-timezone';   
import knex from "../../common/config/database.config.js"

class ContactusService {
    async list(){
        const contactList = await knex('contactus')

        contactList.forEach(i => {
            i.createdAt = moment.utc(i.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        });
        return ({status:true,message:"success",data:contactList})
    }
}

export default new ContactusService();
