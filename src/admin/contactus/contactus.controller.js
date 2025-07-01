import ContactusService from "../contactus/contactus.service.js"

class Contactuscontroller {
    /**
     * Contactus List
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async list(req,res){
        const data = await ContactusService.list()
        return res.json(data)
    }
}

export default new Contactuscontroller();
