import categoryService from "./category.service.js";

class CategoryController {
    /**
     * Category Add
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async add(req, res) {
        const { name } = req.body;
        const data = await categoryService.add({ name });
        return res.json(data);
    }

    /**
     * Category List
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async list(req, res) {
        const data = await categoryService.list(req.query);
        return res.json(data);
    }
    /**
     * Category edit
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async edit(req, res) {
            const { id } = req.params;
            const { name } = req.body;
            const data = await categoryService.edit(id, { name});
            return res.json( data );
    }
    /**
     * Category delete
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        const { id } = req.params;
        const data = await categoryService.delete(id);
        return res.json(data);
    }
}

export default new CategoryController();
