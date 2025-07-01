import subscribeService from "./subscribe.service.js";

class SubscribeController {
   /**
    * Subscriber List
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
   async list(req,res){
    const data = await subscribeService.list()
    return res.json(data)
   }
}

export default new SubscribeController();