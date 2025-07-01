import knex from "../../common/config/database.config.js"

class SubscribeService {
   async subscribe(body){
    try{
        const {email} = body
        const emailOrNot = await knex('subscribe').where('email',email).first()
        if(!emailOrNot){
            await knex('subscribe').insert({
                email:email
            })
            return ({status:true,message:"user subsribed successfully"})
        }else{
            return ({status:false,message:"user already subscribed"})
        }
       }catch(error){
        return ({status:false,message:"something went wrong cant subscribe"})
    }
   }
}

export default new SubscribeService();