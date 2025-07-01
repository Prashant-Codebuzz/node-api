import knex from "../../common/config/database.config.js"

class ContactusService {
    async contactus(body){
            try{
                const {name,email,subject,message} =body
                await knex('contactus').insert({
                    name:name,
                    email:email,
                    subject:subject,
                    message:message
                })
                return ({status:true,message:"contact request created successfully"})
            }catch(err){
                return ({status:false,message:"can't submit contact form"})
            }
    }
}

export default new ContactusService();
