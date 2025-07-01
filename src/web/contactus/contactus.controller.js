import ContactusService from "../contactus/contactus.service.js"

class Contactuscontroller {
    async contactus(req,res){
        const data = await ContactusService.contactus(req.body)
        return res.json(data)
    }
}

export default new Contactuscontroller();
