import blogService from "./blog.service.js";

class BlogController {
    /**
     * Blog Add
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async add(req, res) {
        // const { name } = req.body;
        const data = await blogService.add(req.body, req.files );
        return res.json(data);
    }

    /**
     * Blog List
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async list(req, res) {
        const data = await blogService.list(req.query);
        return res.json(data);
    }
    /**
     * Blog edit
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async edit(req, res) {
        const { id } = req.params;
        // const { name } = req.body;
        
        const data = await blogService.edit(id, req.body, req.files);
        return res.json(data);
    }
    /**
     * Blog delete
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        const { id } = req.params;
        const data = await blogService.delete(id);
        return res.json(data);
    }
}

export default new BlogController();
