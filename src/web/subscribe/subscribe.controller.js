import subscribeService from "./subscribe.service.js";

class SubscribeController {
   async subscribe(req,res){
    const data = await subscribeService.subscribe(req.body)
    return res.json(data)
   }
}

export default new SubscribeController();